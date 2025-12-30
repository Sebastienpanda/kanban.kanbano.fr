import { Component, signal } from "@angular/core";
import { Aside } from "../shared/ui/aside";
import { Header } from "../shared/ui/header";
import { Kanban } from "./kanban";

@Component({
    selector: "app-main-kanban",
    imports: [Aside, Header, Kanban],
    templateUrl: "./main-kanban.html",
})
export class MainKanban {
    readonly asideOpen = signal(false);

    toggleAside() {
        this.asideOpen.update((v) => !v);
    }

    closeAside() {
        this.asideOpen.set(false);
    }
}
