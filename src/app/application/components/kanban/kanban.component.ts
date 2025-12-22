import {
    type CdkDrag,
    type CdkDragDrop,
    type CdkDropList,
    DragDropModule,
    moveItemInArray,
    transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, computed, input } from "@angular/core";
import { Edit2, GripVertical, Inbox, LucideAngularModule, MoreVertical, Plus, Trash2, } from "lucide-angular";
import type { KanbanColumn } from "../../../domain/models/kanban-column.model";
import type { KanbanItem } from "../../../domain/models/kanban-item.model";

@Component({
	selector: "app-kanban",
	imports: [DragDropModule, LucideAngularModule],
	templateUrl: "./kanban.component.html",
	styleUrl: "./kanban.component.css",
})
export class Kanban {
	readonly columns = input.required<KanbanColumn[]>();
	readonly onColumnReorder =
		input.required<(previousIndex: number, currentIndex: number) => void>();
	readonly onItemMove =
		input.required<
			(
				taskId: number,
				sourceColumnId: number,
				targetColumnId: number,
				newIndex: number,
			) => void
		>();
	readonly onCreateTask = input.required<(columnId: number) => void>();
	readonly onEditTask =
		input.required<(item: KanbanItem, columnId: number) => void>();
	readonly onDeleteTask =
		input.required<(itemId: number, columnId: number) => void>();

	protected readonly GripVerticalIcon = GripVertical;
	protected readonly InboxIcon = Inbox;
	protected readonly PlusIcon = Plus;
	protected readonly MoreVerticalIcon = MoreVertical;
	protected readonly EditIcon = Edit2;
	protected readonly TrashIcon = Trash2;

	protected readonly columnIds = computed(() =>
		this.columns().map((col) => `column-${col.id}`),
	);
	protected readonly Plus = Plus;

	protected dropColumn(event: CdkDragDrop<KanbanColumn[]>): void {
		this.onColumnReorder()(event.previousIndex, event.currentIndex);
	}

	protected dropItem(
		event: CdkDragDrop<KanbanItem[]>,
		targetColumnId: number,
	): void {
		const sourceColumnId = parseInt(
			event.previousContainer.id.replace("column-", ""),
			10,
		);
		const item = event.previousContainer.data[event.previousIndex];
		if (!item) return;

		// Use Angular CDK functions to update data locally first
		if (event.previousContainer === event.container) {
			// Same column - reorder
			moveItemInArray(
				event.container.data,
				event.previousIndex,
				event.currentIndex,
			);
		} else {
			// Different columns - transfer
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex,
			);
		}

		// Then persist to backend
		this.onItemMove()(
			item.id,
			sourceColumnId,
			targetColumnId,
			event.currentIndex,
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
