import type { Observable } from "rxjs";
import type { Theme } from "../models";

export interface ThemeGateway {
	getTheme(): Observable<Theme>;

	saveTheme(theme: Theme): Observable<void>;

	getSystemPreference(): Observable<Theme>;
}
