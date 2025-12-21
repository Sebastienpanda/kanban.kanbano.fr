import { Component, signal } from "@angular/core";
import { Aside } from "../shared/ui/aside";
import { Header } from "../shared/ui/header";

@Component({
	selector: "app-kanban",
	templateUrl: "./kanban.html",
	imports: [Header, Aside],
})
export class Kanban {
	protected readonly asideCache = signal<boolean>(false);

	onCacheAside() {
		this.asideCache.set(!this.asideCache());
	}
}
