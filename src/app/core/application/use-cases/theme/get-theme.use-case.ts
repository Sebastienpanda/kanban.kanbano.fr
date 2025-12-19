import { inject, Injectable } from '@angular/core';
import { ThemeRepository, Theme } from '../../ports';

@Injectable({ providedIn: 'root' })
export class GetThemeUseCase {
  private readonly themeRepository = inject(ThemeRepository);

  async execute(): Promise<Theme> {
    return await this.themeRepository.getTheme();
  }
}
