import { inject, Injectable } from "@angular/core";
import { type Observable, switchMap } from "rxjs";
import { THEME_GATEWAY_TOKEN } from "../../application/tokens";
import type { Theme } from "../models";

@Injectable({ providedIn: "root" })
export class ThemeUseCase {
	private readonly themeGateway = inject(THEME_GATEWAY_TOKEN);

	get(): Observable<Theme> {
		return this.themeGateway.getTheme();
	}

	toggle(): Observable<Theme> {
		return this.themeGateway.getTheme().pipe(
			switchMap((currentTheme) => {
				const newTheme: Theme = currentTheme === "light" ? "dark" : "light";
				return this.themeGateway
					.saveTheme(newTheme)
					.pipe(switchMap(() => this.themeGateway.getTheme()));
			}),
		);
	}
}
