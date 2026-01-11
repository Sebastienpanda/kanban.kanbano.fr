import { Component, effect, ElementRef, inject, viewChild } from "@angular/core";
import { ModalService } from "./modal.service";
import { ButtonDirective } from "@shared/ui/directives/button.directive";

@Component({
    selector: "app-modal-kanban",
    templateUrl: "./modal-kanban.html",
    styleUrl: "./modal-kanban.css",
    imports: [ButtonDirective],
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
