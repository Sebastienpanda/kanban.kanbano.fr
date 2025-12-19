import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Theme, ThemeRepository } from '../../application/ports';
import { LocalStorageAdapter } from '../adapters/storage';

const THEME_STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class LocalStorageThemeRepository implements ThemeRepository {
  private readonly storage = inject(LocalStorageAdapter);
  private readonly platformId = inject(PLATFORM_ID);

  async getTheme(): Promise<Theme> {
    const saved = this.storage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return this.getSystemPreference();
  }

  async saveTheme(theme: Theme): Promise<void> {
    this.storage.setItem(THEME_STORAGE_KEY, theme);
  }

  async getSystemPreference(): Promise<Theme> {
    if (!isPlatformBrowser(this.platformId)) {
      return 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
