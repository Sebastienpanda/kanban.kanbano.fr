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
  readonly onColumnsChange = input.required<(columns: KanbanColumn[]) => void>();
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
    const cols = [...this.columns()];
    moveItemInArray(cols, event.previousIndex, event.currentIndex);
    this.onColumnsChange()(cols);
  }

  protected dropItem(event: CdkDragDrop<KanbanItem[]>, columnId: number): void {
    const cols = [...this.columns()];
    const sourceColumn = cols.find(col => col.items === event.previousContainer.data);
    const targetColumn = cols.find(col => col.id === columnId);

    if (!sourceColumn || !targetColumn) return;

    if (event.previousContainer === event.container) {
      moveItemInArray(targetColumn.items, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.onColumnsChange()(cols);
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
