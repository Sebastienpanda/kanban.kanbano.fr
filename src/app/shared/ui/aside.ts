import { Component, input, output } from "@angular/core";
import { ArrowLeft, ArrowRight, LucideAngularModule } from "lucide-angular";

@Component({
	selector: "app-aside",
	template: `
        <div [class]="isAsideOpen() ? '-translate-x-full' : 'translate-x-0'"
             class="bg-secondary-content/80 size-full absolute md:hidden"></div>
        <aside [class]="isAsideOpen() ? 'w-20' : 'w-64'"
               class="inset-0 shadow-lg backdrop-blur-xl h-dvh bg-base-300 absolute transition-[width] duration-350 ease-in-out border-r border-base-content/10">
            <div class="border-b border-base-content/10 p-6 flex items-center justify-between">
                @if (!isAsideOpen()) {
                    <h2 class="text-xl font-bold">Kanbano</h2>
                }
                <button class="btn btn-ghost btn-sm btn-circle" (click)="onToggleAside()">
                    <lucide-icon [img]="isAsideOpen() ? ArrowLeft : ArrowRight"/>
                </button>
            </div>
        </aside>
    `,
	imports: [LucideAngularModule],
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
