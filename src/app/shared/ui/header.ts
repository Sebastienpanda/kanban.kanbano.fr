import { Component, inject } from "@angular/core";
import { LucideAngularModule, Moon, Sun } from "lucide-angular";
import { ThemeService } from "../theme.service";

@Component({
    selector: "app-header",
    imports: [LucideAngularModule],
    templateUrl: "./header.html",
})
export class Header {
    protected readonly themeService = inject(ThemeService);
    protected readonly Sun = Sun;
    protected readonly Moon = Moon;
}
