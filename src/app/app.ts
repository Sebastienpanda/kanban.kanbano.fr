import { Component, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Kanban, Workplace, KanbanColumn } from './kanban';
import { Sidebar } from './sidebar';
import { LucideAngularModule, Menu, Plus, Bell, Settings, Sun, Moon } from 'lucide-angular';

@Component({
  selector: 'app-root',
  imports: [Kanban, Sidebar, LucideAngularModule],
  templateUrl: './app.html',
})
export class App {
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly sidebarCollapsed = signal(true);
  protected readonly isDarkMode = signal(true);

  protected readonly MenuIcon = Menu;
  protected readonly PlusIcon = Plus;
  protected readonly BellIcon = Bell;
  protected readonly SettingsIcon = Settings;
  protected readonly SunIcon = Sun;
  protected readonly MoonIcon = Moon;

  constructor() {
    // Initialize theme from localStorage or system preference
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkMode.set(savedTheme === 'dark');
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkMode.set(prefersDark);
      }

      // Apply theme effect
      effect(() => {
        const theme = this.isDarkMode() ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      });
    }
  }

  protected readonly workplaces = signal<Workplace[]>([
    {
      id: 1,
      name: 'Mon Projet',
      icon: 'rocket',
      columns: [
        {
          id: 1,
          title: 'Todo',
          items: [
            { id: 1, title: 'Créer la page d\'accueil' },
            { id: 2, title: 'Ajouter l\'authentification' },
            { id: 3, title: 'Configurer la base de données' },
          ],
        },
        {
          id: 2,
          title: 'En Attente',
          items: [
            { id: 4, title: 'Review du code' },
            { id: 5, title: 'Tests unitaires' },
          ],
        },
        {
          id: 3,
          title: 'En cours',
          items: [
            { id: 6, title: 'Développement de l\'API' },
            { id: 7, title: 'Intégration du frontend' },
          ],
        },
        {
          id: 4,
          title: 'Done',
          items: [
            { id: 8, title: 'Configuration du projet' },
            { id: 9, title: 'Installation des dépendances' },
          ],
        },
      ],
    },
  ]);

  protected readonly activeWorkplaceId = signal(1);

  protected readonly activeWorkplace = computed(() =>
    this.workplaces().find(w => w.id === this.activeWorkplaceId())
  );

  protected readonly activeColumns = computed(() =>
    this.activeWorkplace()?.columns ?? []
  );

  protected onWorkplaceSelected(id: number): void {
    this.activeWorkplaceId.set(id);
  }

  protected onSidebarToggled(): void {
    this.sidebarCollapsed.update(collapsed => !collapsed);
  }

  protected onColumnsChange(columns: KanbanColumn[]): void {
    const workplaces = this.workplaces();
    const activeId = this.activeWorkplaceId();
    const updatedWorkplaces = workplaces.map(w =>
      w.id === activeId ? { ...w, columns } : w
    );
    this.workplaces.set(updatedWorkplaces);
  }

  protected toggleTheme(): void {
    this.isDarkMode.update(dark => !dark);
  }
}
