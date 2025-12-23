import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { ArrowLeft, ArrowRight, LucideAngularModule } from "lucide-angular";

@Component({
    selector: "app-aside",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LucideAngularModule],
    template: `
        <div
            [class]="isAsideOpen() ? '-translate-x-full' : 'translate-x-0'"
            class="bg-secondary-content/80 absolute size-full md:hidden"
        ></div>
        <aside
            [class]="isAsideOpen() ? 'w-20' : 'w-64'"
            class="bg-base-300 border-base-content/10 absolute inset-0 h-dvh border-r shadow-lg backdrop-blur-xl transition-[width] duration-350 ease-in-out"
        >
            <div class="border-base-content/10 flex items-center justify-between border-b p-6">
                @if (!isAsideOpen()) {
                    <h2 class="text-xl font-bold">Kanbano</h2>
                }
                <button class="btn btn-ghost btn-sm btn-circle" (click)="onToggleAside()">
                    <lucide-icon [img]="isAsideOpen() ? ArrowLeft : ArrowRight" />
                </button>
            </div>
        </aside>
    `,
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
