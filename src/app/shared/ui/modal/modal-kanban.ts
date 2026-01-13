import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, signal, viewChild } from "@angular/core";
import type { Tasks } from "@domain/models/kanban-tasks.model";
import { ButtonDirective } from "@shared/ui/directives/button.directive";
import { ModalService } from "./modal.service";
import { TaskEdit } from "./task-edit/task-edit";
import { TaskView } from "./task-view/task-view";

@Component({
    selector: "app-modal-kanban",
    templateUrl: "./modal-kanban.html",
    styleUrl: "./modal-kanban.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonDirective, TaskView, TaskEdit],
})
export class ModalKanban {
    private readonly modalService = inject(ModalService);
    private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>("modalDialog");

    protected readonly item = this.modalService.selectedItem;
    protected readonly isEditMode = signal(false);

    constructor() {
        effect(() => {
            if (this.modalService.isOpen()) {
                this.dialog().nativeElement.showModal();
            }
        });
    }

    protected onEdit(): void {
        this.isEditMode.set(true);
    }

    protected onSave(task: Tasks): void {
        this.modalService.updateTask(task);
        this.isEditMode.set(false);
    }

    protected onCancelEdit(): void {
        this.isEditMode.set(false);
    }

    closeModal(): void {
        this.dialog().nativeElement.close();
        this.modalService.closeModal();
        this.isEditMode.set(false);
    }
}
