import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, Observable } from "rxjs";
import type { ThemeGateway } from "../../domain/gateways";
import type { Theme } from "../../domain/models";

@Injectable({ providedIn: "root" })
export class InMemoryThemeGateway implements ThemeGateway {
	private readonly theme$ = new BehaviorSubject<Theme>("light");

	getTheme(): Observable<Theme> {
		return this.theme$.asObservable().pipe(delay(50));
	}

	saveTheme(theme: Theme): Observable<void> {
		return new Observable((observer) => {
			setTimeout(() => {
				this.theme$.next(theme);
				observer.next();
				observer.complete();
			}, 50);
		});
	}

	getSystemPreference(): Observable<Theme> {
		return new Observable((observer) => {
			const prefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)",
			).matches;
			observer.next(prefersDark ? "dark" : "light");
			observer.complete();
		});
	}
}
