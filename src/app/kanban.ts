import {Component, computed, input} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {Edit2, GripVertical, Inbox, LucideAngularModule, MoreVertical, Plus, Trash2} from 'lucide-angular';

export interface KanbanItem {
  id: number;
  title: string;
}

export interface KanbanColumn {
  id: number;
  title: string;
  items: KanbanItem[];
}

export interface Workplace {
  id: number;
  name: string;
  icon: string;
  columns: KanbanColumn[];
}

@Component({
  selector: 'app-kanban',
  imports: [DragDropModule, LucideAngularModule],
  templateUrl: './kanban.html',
  styleUrl: './kanban.css',
})
export class Kanban {
  readonly columns = input.required<KanbanColumn[]>();
  readonly onColumnReorder = input.required<(previousIndex: number, currentIndex: number) => void>();
  readonly onItemMove = input.required<(taskId: number, sourceColumnId: number, targetColumnId: number, newIndex: number) => void>();
  readonly onCreateTask = input.required<(columnId: number) => void>();
  readonly onEditTask = input.required<(item: KanbanItem, columnId: number) => void>();
  readonly onDeleteTask = input.required<(itemId: number, columnId: number) => void>();

  protected readonly GripVerticalIcon = GripVertical;
  protected readonly InboxIcon = Inbox;
  protected readonly PlusIcon = Plus;
  protected readonly MoreVerticalIcon = MoreVertical;
  protected readonly EditIcon = Edit2;
  protected readonly TrashIcon = Trash2;

  protected readonly columnIds = computed(() =>
    this.columns().map(col => `column-${col.id}`)
  );
  protected readonly Plus = Plus;

  protected dropColumn(event: CdkDragDrop<KanbanColumn[]>): void {
    this.onColumnReorder()(event.previousIndex, event.currentIndex);
  }

  protected dropItem(event: CdkDragDrop<KanbanItem[]>, targetColumnId: number): void {
    const sourceColumn = this.columns().find(col => col.items === event.previousContainer.data);
    const targetColumn = this.columns().find(col => col.id === targetColumnId);

    if (!sourceColumn || !targetColumn) return;

    const item = sourceColumn.items[event.previousIndex];
    if (!item) return;

    this.onItemMove()(
      item.id,
      sourceColumn.id,
      targetColumn.id,
      event.currentIndex
    );
  }

  protected trackByColumnId(_index: number, column: KanbanColumn): number {
    return column.id;
  }

  protected trackByItemId(_index: number, item: KanbanItem): number {
    return item.id;
  }

  protected allowDrop(drag: CdkDrag, drop: CdkDropList): boolean {
    return true;
  }
}
