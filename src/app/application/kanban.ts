import {
    CdkDrag,
    type CdkDragDrop,
    CdkDragHandle,
    CdkDropList,
    moveItemInArray,
    transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, inject } from "@angular/core";
import type { Column } from "@domain/models/kanban-column.model";
import type { Item } from "@domain/models/kanban-item.model";
import { KanbanColumnsUseCase } from "@domain/use-cases/kanban-columns.use-case";
import { GET_COLUMNS_GATEWAY } from "./tokens";
import { CdkScrollable } from "@angular/cdk/overlay";
import { toSignal } from "@angular/core/rxjs-interop";
import { ModalKanban } from "../shared/ui/modal-kanban";
import { ModalService } from "../shared/modal.service";

@Component({
    selector: "app-kanban",
    templateUrl: "./kanban.html",
    styleUrl: "./kanban.css",
    imports: [CdkScrollable, CdkDropList, CdkDrag, CdkDragHandle, ModalKanban],
})
export class Kanban {
    protected readonly modalService = inject(ModalService);
    protected readonly isOpen = this.modalService.isOpen;
    private readonly useCase = new KanbanColumnsUseCase(inject(GET_COLUMNS_GATEWAY));
    protected readonly columns = toSignal(this.useCase.all(), {
        initialValue: [],
    });

    getConnectedLists(currentIndex: number): string[] {
        return this.columns()
            .map((_, index) => `items-list-${index}`)
            .filter((_, index) => index !== currentIndex);
    }

    dropColumn(event: CdkDragDrop<Column[]>) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    drop(event: CdkDragDrop<Item[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }

    openDetailModal(item: Item): void {
        this.modalService.openModal(item);
    }
}
