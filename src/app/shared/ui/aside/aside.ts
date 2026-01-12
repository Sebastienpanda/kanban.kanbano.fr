import { Component, inject, input, output } from "@angular/core";
import { ArrowLeft, ArrowRight, LucideAngularModule } from "lucide-angular";
import { ButtonDirective } from "../directives/button.directive";
import { Workspaces } from "@domain/models/kanban-workspaces.model";
import { RouterLink } from "@angular/router";
import { WorkspaceStateService } from "@shared/workspace-state-service";

@Component({
    selector: "app-aside",
    imports: [LucideAngularModule, ButtonDirective, RouterLink],
    templateUrl: "./aside.html",
    styleUrl: "./aside.css",
    host: {
        class: "aside-grid",
    },
})
export class Aside {
    readonly isAsideOpen = input.required();
    readonly toggleAside = output();
    readonly workspaces = input.required<Workspaces[]>();
    protected readonly ArrowLeft = ArrowLeft;
    protected readonly ArrowRight = ArrowRight;
    private readonly workspaceState = inject(WorkspaceStateService);

    onSelectWorkspace(workspaceId: string) {
        this.workspaceState.selectWorkspace(workspaceId);
    }

    onToggleAside() {
        this.toggleAside.emit();
    }
}
