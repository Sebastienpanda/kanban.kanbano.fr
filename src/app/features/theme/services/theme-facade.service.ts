import { Injectable, inject, signal, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GetThemeUseCase, ToggleThemeUseCase } from '../../../core/application/use-cases';
import { Theme } from '../../../core/application/ports';

@Injectable({ providedIn: 'root' })
export class ThemeFacadeService {
  private readonly getThemeUseCase = inject(GetThemeUseCase);
  private readonly toggleThemeUseCase = inject(ToggleThemeUseCase);
  private readonly platformId = inject(PLATFORM_ID);

  // State
  readonly theme = signal<Theme>('dark');

  constructor() {
    // Load initial theme
    this.loadTheme();

    // Apply theme effect
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const currentTheme = this.theme();
        document.documentElement.setAttribute('data-theme', currentTheme);
      });
    }
  }

  private async loadTheme(): Promise<void> {
    const theme = await this.getThemeUseCase.execute();
    this.theme.set(theme);
  }

  async toggleTheme(): Promise<void> {
    const newTheme = await this.toggleThemeUseCase.execute();
    this.theme.set(newTheme);
  }
}
