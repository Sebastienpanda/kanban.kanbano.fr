import { Injectable, signal } from "@angular/core";
import type { Tasks } from "@domain/models/kanban-tasks.model";

@Injectable({
    providedIn: "root",
})
export class ModalService {
    readonly isOpen = signal<boolean>(false);
    readonly selectedItem = signal<Tasks | null>(null);
    readonly onTaskUpdated = signal<Tasks | null>(null);

    openModal(item: Tasks): void {
        this.selectedItem.set(item);
        this.isOpen.set(true);
    }

    closeModal(): void {
        this.isOpen.set(false);
        this.selectedItem.set(null);
    }

    updateTask(task: Tasks): void {
        this.selectedItem.set(task);
        this.onTaskUpdated.set(task);
    }
}
