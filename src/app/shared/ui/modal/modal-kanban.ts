import { Component, effect, ElementRef, inject, viewChild } from "@angular/core";
import { ModalService } from "./modal.service";

@Component({
    selector: "app-modal-kanban",
    templateUrl: "./modal-kanban.html",
})
export class ModalKanban {
    private readonly modalService = inject(ModalService);
    protected readonly item = this.modalService.selectedItem;
    private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>("modalDialog");

    constructor() {
        effect(() => {
            if (this.modalService.isOpen()) {
                this.dialog().nativeElement.showModal();
            }
        });
    }

    closeModal(): void {
        this.dialog().nativeElement.close();
        this.modalService.closeModal();
    }
}
