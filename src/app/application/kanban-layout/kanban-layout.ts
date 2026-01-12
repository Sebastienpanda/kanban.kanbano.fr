import { Component, signal } from "@angular/core";
import { Aside } from "@shared/ui/aside/aside";
import { Header } from "@shared/ui/header/header";
import { KanbanBoard } from "../kanban-board";

@Component({
    selector: "app-kanban-layout",
    imports: [Aside, Header, KanbanBoard],
    templateUrl: "./kanban-layout.html",
    styleUrl: "./kanban-layout.css",
})
export class KanbanLayout {
    readonly asideOpen = signal(false);

    toggleAside() {
        this.asideOpen.update((v) => !v);
    }
}
