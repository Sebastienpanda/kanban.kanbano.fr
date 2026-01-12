import {
    CdkDrag,
    type CdkDragDrop,
    CdkDragHandle,
    CdkDropList,
    moveItemInArray,
    transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, computed, inject, input } from "@angular/core";
import type { Columns } from "@domain/models/kanban-columns.model";
import type { Tasks } from "@domain/models/kanban-tasks.model";
import { CdkScrollable } from "@angular/cdk/overlay";
import { ModalKanban } from "@shared/ui/modal/modal-kanban";
import { ModalService } from "@shared/ui/modal/modal.service";
import { Workspaces } from "@domain/models/kanban-workspaces.model";

@Component({
    selector: "app-workspace",
    templateUrl: "./workspace.html",
    styleUrl: "./workspace.css",
    imports: [CdkScrollable, CdkDropList, CdkDrag, CdkDragHandle, ModalKanban],
    host: {
        class: "kanban-grid",
    },
})
export class Workspace {
    readonly workspaces = input.required<Workspaces>();
    protected readonly modalService = inject(ModalService);
    protected readonly isOpen = this.modalService.isOpen;
    protected readonly connectedLists = computed(() =>
        this.workspaces().columns.map((_, index) => `tasks-list-${index}`),
    );

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
