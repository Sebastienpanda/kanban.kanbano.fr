export type Theme = 'light' | 'dark';

export abstract class ThemeRepository {
  abstract getTheme(): Promise<Theme>;
  abstract saveTheme(theme: Theme): Promise<void>;
  abstract getSystemPreference(): Promise<Theme>;
}
