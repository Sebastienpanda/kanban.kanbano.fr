import { Injectable } from '@angular/core';
import { Theme, ThemeRepository } from '../../application/ports';

@Injectable({ providedIn: 'root' })
export class InMemoryThemeRepository implements ThemeRepository {
  private theme: Theme = 'dark';

  async getTheme(): Promise<Theme> {
    return this.theme;
  }

  async saveTheme(theme: Theme): Promise<void> {
    this.theme = theme;
  }

  async getSystemPreference(): Promise<Theme> {
    return 'dark';
  }
}
