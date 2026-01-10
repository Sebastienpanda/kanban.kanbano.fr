import { Component, input, output } from "@angular/core";
import { ArrowLeft, ArrowRight, LucideAngularModule } from "lucide-angular";
import { ButtonDirective } from "../directives/button.directive";

@Component({
    selector: "app-aside",
    imports: [LucideAngularModule, ButtonDirective],
    templateUrl: "./aside.html",
    styleUrl: "./aside.css",
})
export class Aside {
    readonly isAsideOpen = input.required();
    readonly toggleAside = output();
    protected readonly ArrowLeft = ArrowLeft;
    protected readonly ArrowRight = ArrowRight;

    onToggleAside() {
        this.toggleAside.emit();
    }
}
