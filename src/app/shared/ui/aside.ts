import { Component, input, output } from "@angular/core";
import { ArrowLeft, ArrowRight, LucideAngularModule } from "lucide-angular";

@Component({
    selector: "app-aside",
    imports: [LucideAngularModule],
    templateUrl: "./aside.html",
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
