import { Component, inject } from "@angular/core";
import { LucideAngularModule, Moon, Sun } from "lucide-angular";
import { ThemeService } from "../theme.service";

@Component({
    selector: "app-header",
    imports: [LucideAngularModule],
    template: `
        <header class="bg-base-300 border-base-content/10 flex justify-between border-b p-6">
            <h1 class="truncate text-lg lg:text-2xl">Mon projet</h1>
            <button
                (click)="themeService.toggle()"
                [attr.aria-label]="themeService.isDark() ? 'Passer en mode clair' : 'Passer en mode sombre'"
                class="btn btn-sm btn-circle hover:bg-base-100 group"
            >
                @if (themeService.isDark()) {
                    <lucide-icon
                        [img]="Sun"
                        aria-hidden="true"
                        class="transition-transform duration-300 ease-in-out group-hover:rotate-12"
                        size="20"
                    />
                } @else {
                    <lucide-icon
                        [img]="Moon"
                        aria-hidden="true"
                        class="transition-transform duration-300 ease-in-out group-hover:rotate-12"
                        size="20"
                    />
                }
            </button>
        </header>
    `,
})
export class Header {
    protected readonly themeService = inject(ThemeService);
    protected readonly Sun = Sun;
    protected readonly Moon = Moon;
}
