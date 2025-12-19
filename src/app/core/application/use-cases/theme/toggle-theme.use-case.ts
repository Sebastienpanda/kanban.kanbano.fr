import { inject, Injectable } from '@angular/core';
import { ThemeRepository, Theme } from '../../ports';

@Injectable({ providedIn: 'root' })
export class ToggleThemeUseCase {
  private readonly themeRepository = inject(ThemeRepository);

  async execute(): Promise<Theme> {
    const currentTheme = await this.themeRepository.getTheme();
    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    await this.themeRepository.saveTheme(newTheme);
    return newTheme;
  }
}
