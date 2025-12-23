import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { Aside } from "../shared/ui/aside";
import { Header } from "../shared/ui/header";
import { MainKanban } from "./main-kanban";

@Component({
    selector: "app-kanban",
    imports: [Header, Aside, MainKanban],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-header [isAsideOpen]="asideCache()" />
        <app-aside (toggleAside)="onCacheAside()" [isAsideOpen]="asideCache()" />
        <app-main-kanban [isAsideOpen]="asideCache()" />
    `,
})
export class Kanban {
    protected readonly asideCache = signal<boolean>(false);

    onCacheAside() {
        this.asideCache.set(!this.asideCache());
    }
}
