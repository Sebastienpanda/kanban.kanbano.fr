import { Component, inject, input } from "@angular/core";
import { LucideAngularModule, Moon, Sun } from "lucide-angular";
import { ThemeService } from "../theme.service";

@Component({
	selector: "app-header",
	template: `
        <header [class]="isAsideOpen() ? 'ml-20' : 'md:ml-64'"
                class="p-6 bg-base-300 transition-[margin-left] duration-350 ease-in-out flex justify-between border-b border-base-content/10 shadow-lg backdrop-blur-xl">
            <h1 class="text-lg lg:text-2xl truncate">Mon projet</h1>
            <button
                (click)="themeService.toggle()"
                [attr.aria-label]="themeService.isDark() ? 'Passer en mode clair' : 'Passer en mode sombre'"
                class="btn btn-sm btn-circle hover:bg-base-100 group">
                @if (themeService.isDark()) {
                    <lucide-icon [img]="Sun" aria-hidden="true"
                                 class="group-hover:rotate-12 transition-transform duration-300 ease-in-out"
                                 size="20"/>
                } @else {
                    <lucide-icon [img]="Moon" aria-hidden="true"
                                 class="group-hover:rotate-12 transition-transform duration-300 ease-in-out"
                                 size="20"/>
                }
            </button>
        </header>
    `,
	imports: [LucideAngularModule],
})
export class Header {
	readonly isAsideOpen = input.required<boolean>();
	protected readonly themeService = inject(ThemeService);
	protected readonly Sun = Sun;
	protected readonly Moon = Moon;
}
