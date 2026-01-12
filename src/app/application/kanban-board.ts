import {
    CdkDrag,
    type CdkDragDrop,
    CdkDragHandle,
    CdkDropList,
    moveItemInArray,
    transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, computed, inject } from "@angular/core";
import type { Columns } from "@domain/models/kanban-columns.model";
import type { Tasks } from "@domain/models/kanban-tasks.model";
import { KanbanColumnsUseCase } from "@domain/use-cases/kanban-columns.use-case";
import { GET_COLUMNS_GATEWAY } from "./tokens";
import { CdkScrollable } from "@angular/cdk/overlay";
import { toSignal } from "@angular/core/rxjs-interop";
import { ModalKanban } from "@shared/ui/modal/modal-kanban";
import { ModalService } from "@shared/ui/modal/modal.service";

@Component({
    selector: "app-kanban",
    templateUrl: "./kanban-board.html",
    styleUrl: "./kanban-board.css",
    imports: [CdkScrollable, CdkDropList, CdkDrag, CdkDragHandle, ModalKanban],
    host: {
        class: "kanban-grid",
    },
})
export class KanbanBoard {
    protected readonly modalService = inject(ModalService);
    protected readonly isOpen = this.modalService.isOpen;
    private readonly useCase = new KanbanColumnsUseCase(inject(GET_COLUMNS_GATEWAY));
    protected readonly columns = toSignal(this.useCase.all(), {
        initialValue: [],
    });
    protected readonly connectedLists = computed(() => this.columns().map((_, index) => `tasks-list-${index}`));

    dropColumn(event: CdkDragDrop<Columns[]>) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    drop(event: CdkDragDrop<Tasks[]>) {
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

    openDetailModal(item: Tasks): void {
        this.modalService.openModal(item);
    }
}
