import { Injectable, signal } from "@angular/core";
import type { Item } from "@domain/models/kanban-item.model";

@Injectable({
    providedIn: "root",
})
export class ModalService {
    readonly isOpen = signal<boolean>(false);
    readonly selectedItem = signal<Item | null>(null);

    openModal(item: Item): void {
        this.selectedItem.set(item);
        this.isOpen.set(true);
    }

    closeModal(): void {
        this.isOpen.set(false);
        this.selectedItem.set(null);
    }
}
