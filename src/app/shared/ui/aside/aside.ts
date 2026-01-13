import { ChangeDetectionStrategy, Component, inject, input, output } from "@angular/core";
import { ArrowLeft, ArrowRight, LucideAngularModule } from "lucide-angular";
import { Workspaces } from "@domain/models/kanban-workspaces.model";
import { WorkspaceStateService } from "@shared/workspace-state-service";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-aside",
    imports: [LucideAngularModule, RouterLink],
    templateUrl: "./aside.html",
    styleUrl: "./aside.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: "aside-grid",
    },
})
export class Aside {
    readonly isAsideOpen = input.required<boolean>();
    readonly toggleAside = output();
    readonly workspaces = input.required<Workspaces[]>();
    protected readonly ArrowLeft = ArrowLeft;
    protected readonly ArrowRight = ArrowRight;
    private readonly workspaceState = inject(WorkspaceStateService);
    protected readonly selectedWorkspaceId = this.workspaceState.selectedWorkspaceId;

    onSelectWorkspace(workspaceId: string) {
        this.workspaceState.selectWorkspace(workspaceId);
    }

    onToggleAside() {
        this.toggleAside.emit();
    }

    getWorkspaceInitials(name: string): string {
        return name
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }
}
