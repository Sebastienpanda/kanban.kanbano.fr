import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Kanban, KanbanColumn, KanbanItem } from './kanban';
import { Sidebar } from './sidebar';
import { Bell, LucideAngularModule, Menu, Moon, Plus, Settings, Sun, X } from 'lucide-angular';
import { NgxSonnerToaster } from 'ngx-sonner';
import { KanbanFacadeService } from './features/kanban/services';
import { WorkspaceFacadeService } from './features/workspace/services';
import { ThemeFacadeService } from './features/theme/services';
import {
  NewTaskModalComponent,
  EditTaskModalComponent,
  DeleteConfirmModalComponent,
  type Column,
  type TaskToEdit,
} from './features/modals/components';

@Component({
  selector: 'app-root',
  imports: [
    Kanban,
    Sidebar,
    LucideAngularModule,
    FormsModule,
    NgxSonnerToaster,
    NewTaskModalComponent,
    EditTaskModalComponent,
    DeleteConfirmModalComponent,
  ],
  templateUrl: './app.html',
})
export class App {
  // Inject Facades
  private readonly kanbanFacade = inject(KanbanFacadeService);
  private readonly workspaceFacade = inject(WorkspaceFacadeService);
  private readonly themeFacade = inject(ThemeFacadeService);

  // UI State
  protected readonly sidebarCollapsed = signal(true);
  protected readonly MenuIcon = Menu;
  protected readonly PlusIcon = Plus;
  protected readonly BellIcon = Bell;
  protected readonly SettingsIcon = Settings;
  protected readonly SunIcon = Sun;
  protected readonly MoonIcon = Moon;
  protected readonly XIcon = X;

  // Modal State
  protected readonly showNewTaskModal = signal(false);
  protected readonly selectedColumnId = signal<number | null>(null);
  protected readonly showEditTaskModal = signal(false);
  protected readonly editingTask = signal<TaskToEdit | null>(null);
  protected readonly showDeleteConfirm = signal(false);
  protected readonly taskToDelete = signal<{ itemId: number; columnId: number } | null>(null);

  // Computed state from Facades
  protected readonly isDarkMode = computed(() => this.themeFacade.theme() === 'dark');
  protected readonly workplaces = computed(() =>
    this.workspaceFacade.workplaces().map(w => w.toJSON())
  );
  protected readonly activeWorkplaceId = computed(() => this.workspaceFacade.activeWorkplaceId());
  protected readonly activeWorkplace = computed(() =>
    this.workplaces().find(w => w.id === this.activeWorkplaceId())
  );
  protected readonly activeColumns = computed(() =>
    this.kanbanFacade.activeWorkplace()?.columns.map(col => col.toJSON()) ?? []
  );
  protected readonly modalColumns = computed<Column[]>(() =>
    this.activeColumns().map(col => ({ id: col.id, title: col.title }))
  );

  constructor() {
    // Initialize facades
    this.initializeFacades();
  }

  private async initializeFacades(): Promise<void> {
    await this.workspaceFacade.loadWorkplaces();
    await this.kanbanFacade.loadWorkplace(this.activeWorkplaceId());
  }

  // Sidebar actions
  protected onSidebarToggled(): void {
    this.sidebarCollapsed.update(collapsed => !collapsed);
  }

  protected async onWorkplaceSelected(id: number): Promise<void> {
    this.workspaceFacade.selectWorkplace(id);
    await this.kanbanFacade.loadWorkplace(id);
  }

  // Theme actions
  protected async toggleTheme(): Promise<void> {
    await this.themeFacade.toggleTheme();
  }

  // Kanban Column reordering
  protected async onColumnsChange(columns: KanbanColumn[]): Promise<void> {
    // Called when columns are drag-dropped
    // For now, we reload after any change
    await this.kanbanFacade.loadWorkplace(this.activeWorkplaceId());
  }

  // New Task Modal
  protected openNewTaskModal(): void {
    this.showNewTaskModal.set(true);
    const firstColumnId = this.activeColumns()[0]?.id ?? null;
    this.selectedColumnId.set(firstColumnId);
  }

  protected openNewTaskModalForColumn(columnId: number): void {
    this.showNewTaskModal.set(true);
    this.selectedColumnId.set(columnId);
  }

  protected closeNewTaskModal(): void {
    this.showNewTaskModal.set(false);
    this.selectedColumnId.set(null);
  }

  protected async onTaskCreated(event: { columnId: number; title: string }): Promise<void> {
    await this.kanbanFacade.createTask(event);
    this.closeNewTaskModal();
  }

  // Edit Task Modal
  protected openEditTaskModal(item: KanbanItem, columnId: number): void {
    this.editingTask.set({ id: item.id, title: item.title, columnId });
    this.showEditTaskModal.set(true);
  }

  protected closeEditTaskModal(): void {
    this.showEditTaskModal.set(false);
    this.editingTask.set(null);
  }

  protected async onTaskUpdated(event: { taskId: number; columnId: number; title: string }): Promise<void> {
    await this.kanbanFacade.updateTask(event);
    this.closeEditTaskModal();
  }

  // Delete Confirmation Modal
  protected confirmDeleteTask(itemId: number, columnId: number): void {
    this.taskToDelete.set({ itemId, columnId });
    this.showDeleteConfirm.set(true);
  }

  protected closeDeleteConfirm(): void {
    this.showDeleteConfirm.set(false);
    this.taskToDelete.set(null);
  }

  protected async onDeleteConfirmed(): Promise<void> {
    const toDelete = this.taskToDelete();
    if (!toDelete) return;

    await this.kanbanFacade.deleteTask({
      taskId: toDelete.itemId,
      columnId: toDelete.columnId,
    });
    this.closeDeleteConfirm();
  }
}
