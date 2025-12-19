import {Component, computed, effect, inject, PLATFORM_ID, signal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Kanban, KanbanColumn, KanbanItem, Workplace} from './kanban';
import {Sidebar} from './sidebar';
import {Bell, LucideAngularModule, Menu, Moon, Plus, Settings, Sun, X} from 'lucide-angular';
import {NgxSonnerToaster, toast} from 'ngx-sonner';

@Component({
  selector: 'app-root',
  imports: [Kanban, Sidebar, LucideAngularModule, FormsModule, NgxSonnerToaster],
  templateUrl: './app.html',
})
export class App {
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly sidebarCollapsed = signal(true);
  protected readonly isDarkMode = signal(true);
  protected readonly MenuIcon = Menu;
  protected readonly PlusIcon = Plus;
  protected readonly BellIcon = Bell;
  protected readonly SettingsIcon = Settings;
  protected readonly SunIcon = Sun;
  protected readonly MoonIcon = Moon;
  protected readonly XIcon = X;
  protected readonly showNewTaskModal = signal(false);
  protected readonly newTaskTitle = signal('');
  protected readonly selectedColumnId = signal<number | null>(null);
  protected readonly showEditTaskModal = signal(false);
  protected readonly editingTask = signal<{ item: KanbanItem; columnId: number } | null>(null);
  protected readonly editTaskTitle = signal('');
  protected readonly showDeleteConfirm = signal(false);
  protected readonly taskToDelete = signal<{ itemId: number; columnId: number } | null>(null);

  private readonly defaultWorkplaces: Workplace[] = [
    {
      id: 1,
      name: 'Mon Projet',
      icon: 'rocket',
      columns: [
        {
          id: 1,
          title: 'À faire',
          items: [
            { id: 1, title: 'Créer la page d\'accueil' },
            { id: 2, title: 'Ajouter l\'authentification' },
            { id: 3, title: 'Configurer la base de données' },
          ],
        },
        {
          id: 2,
          title: 'En cours',
          items: [
            { id: 4, title: 'Développement de l\'API' },
            { id: 5, title: 'Intégration du frontend' },
          ],
        },
        {
          id: 3,
          title: 'Terminé',
          items: [
            { id: 6, title: 'Configuration du projet' },
            { id: 7, title: 'Installation des dépendances' },
          ],
        },
      ],
    },
  ];

  protected readonly workplaces = signal<Workplace[]>(this.loadWorkplaces());
  protected readonly activeWorkplaceId = signal(1);
  protected readonly activeWorkplace = computed(() =>
    this.workplaces().find(w => w.id === this.activeWorkplaceId())
  );
  protected readonly activeColumns = computed(() =>
    this.activeWorkplace()?.columns ?? []
  );

  constructor() {
    // Initialize theme from localStorage or system preference
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkMode.set(savedTheme === 'dark');
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode.set(prefersDark);
      }

      // Apply theme effect
      effect(() => {
        const theme = this.isDarkMode() ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      });

      // Save workplaces to localStorage on change
      effect(() => {
        const workplaces = this.workplaces();
        localStorage.setItem('workplaces', JSON.stringify(workplaces));
      });
    }
  }

  protected onWorkplaceSelected(id: number): void {
    this.activeWorkplaceId.set(id);
  }

  protected onSidebarToggled(): void {
    this.sidebarCollapsed.update(collapsed => !collapsed);
  }

  protected onColumnsChange(columns: KanbanColumn[]): void {
    const workplaces = this.workplaces();
    const activeId = this.activeWorkplaceId();
    const updatedWorkplaces = workplaces.map(w =>
      w.id === activeId ? { ...w, columns } : w
    );
    this.workplaces.set(updatedWorkplaces);
  }

  protected toggleTheme(): void {
    this.isDarkMode.update(dark => !dark);
  }

  protected openNewTaskModal(): void {
    this.showNewTaskModal.set(true);
    this.newTaskTitle.set('');
    const firstColumnId = this.activeColumns()[0]?.id ?? null;
    this.selectedColumnId.set(firstColumnId);
  }

  protected closeNewTaskModal(): void {
    this.showNewTaskModal.set(false);
    this.newTaskTitle.set('');
    this.selectedColumnId.set(null);
  }

  protected addNewTask(): void {
    const title = this.newTaskTitle().trim();
    const columnId = this.selectedColumnId();

    if (!title || columnId === null) return;

    const workplaces = this.workplaces();
    const activeId = this.activeWorkplaceId();

    const updatedWorkplaces = workplaces.map(w => {
      if (w.id !== activeId) return w;

      const columns = w.columns.map(col => {
        if (col.id !== columnId) return col;

        const maxId = Math.max(
          0,
          ...w.columns.flatMap(c => c.items.map(item => item.id))
        );

        return {
          ...col,
          items: [...col.items, { id: maxId + 1, title }]
        };
      });

      return { ...w, columns };
    });

    this.workplaces.set(updatedWorkplaces);
    toast.success('Tâche créée avec succès', {
      description: title
    });
    this.closeNewTaskModal();
  }

  protected openEditTaskModal(item: KanbanItem, columnId: number): void {
    this.editingTask.set({ item, columnId });
    this.editTaskTitle.set(item.title);
    this.showEditTaskModal.set(true);
  }

  protected closeEditTaskModal(): void {
    this.showEditTaskModal.set(false);
    this.editingTask.set(null);
    this.editTaskTitle.set('');
  }

  protected saveEditTask(): void {
    const editing = this.editingTask();
    const newTitle = this.editTaskTitle().trim();

    if (!editing || !newTitle) return;

    const workplaces = this.workplaces();
    const activeId = this.activeWorkplaceId();

    const updatedWorkplaces = workplaces.map(w => {
      if (w.id !== activeId) return w;

      const columns = w.columns.map(col => {
        if (col.id !== editing.columnId) return col;

        return {
          ...col,
          items: col.items.map(item =>
            item.id === editing.item.id ? { ...item, title: newTitle } : item
          )
        };
      });

      return { ...w, columns };
    });

    this.workplaces.set(updatedWorkplaces);
    toast.success('Tâche modifiée avec succès', {
      description: newTitle
    });
    this.closeEditTaskModal();
  }

  protected confirmDeleteTask(itemId: number, columnId: number): void {
    this.taskToDelete.set({ itemId, columnId });
    this.showDeleteConfirm.set(true);
  }

  protected closeDeleteConfirm(): void {
    this.showDeleteConfirm.set(false);
    this.taskToDelete.set(null);
  }

  protected deleteTask(): void {
    const toDelete = this.taskToDelete();
    if (!toDelete) return;

    const workplaces = this.workplaces();
    const activeId = this.activeWorkplaceId();

    // Trouver le titre de la tâche avant de la supprimer
    const taskTitle = workplaces
      .find(w => w.id === activeId)
      ?.columns.find(col => col.id === toDelete.columnId)
      ?.items.find(item => item.id === toDelete.itemId)?.title;

    const updatedWorkplaces = workplaces.map(w => {
      if (w.id !== activeId) return w;

      const columns = w.columns.map(col => {
        if (col.id !== toDelete.columnId) return col;

        return {
          ...col,
          items: col.items.filter(item => item.id !== toDelete.itemId)
        };
      });

      return { ...w, columns };
    });

    this.workplaces.set(updatedWorkplaces);
    toast.success('Tâche supprimée', {
      description: taskTitle || 'La tâche a été supprimée avec succès'
    });
    this.closeDeleteConfirm();
  }

  private loadWorkplaces(): Workplace[] {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('workplaces');
      if (saved && saved !== 'undefined') {
        try {
          const parsed = JSON.parse(saved);
          // Vérifier que les données sont valides
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        } catch (e) {
          console.error('Failed to parse workplaces from localStorage', e);
          // Nettoyer le localStorage corrompu
          localStorage.removeItem('workplaces');
        }
      }
    }
    return this.defaultWorkplaces;
  }
}
