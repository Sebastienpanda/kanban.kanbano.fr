import { Component, input, output } from '@angular/core';
import { Workplace } from './kanban';
import { LucideAngularModule, Rocket, ChevronLeft, ChevronRight, Plus } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule],
  template: `
    <aside class="flex md:flex h-screen bg-base-300 flex-col shadow-xl border-r border-base-content/10 transition-all duration-300 ease-in-out fixed md:relative z-50 md:z-auto"
           [class.w-64]="!collapsed()"
           [class.w-20]="collapsed()"
           [class.-translate-x-full]="collapsed() && isMobile()"
           [class.translate-x-0]="!collapsed() || !isMobile()">
      <div class="p-4 flex items-center justify-between border-b border-base-content/10">
        @if (!collapsed()) {
            <h1 class="text-xl font-bold">
              Kanbano
            </h1>
        }
        <button
          class="btn btn-ghost btn-sm btn-circle"
          (click)="toggleSidebar()">
          @if (collapsed()) {
            <lucide-icon [img]="ChevronRightIcon" [size]="20"></lucide-icon>
          } @else {
            <lucide-icon [img]="ChevronLeftIcon" [size]="20"></lucide-icon>
          }
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-3">
        @if (!collapsed()) {
          <div class="text-xs font-semibold text-base-content/60 uppercase tracking-wider px-3 py-2">
            Workplaces
          </div>
        }
        <div class="space-y-2">
          @for (workplace of workplaces(); track workplace.id) {
            <button
              class="w-full btn btn-ghost justify-start gap-3 group relative overflow-hidden transition-all duration-200"
              [class.btn-active]="workplace.id === activeWorkplaceId()"
              [class.bg-primary/10]="workplace.id === activeWorkplaceId()"
              [class.hover:bg-base-content/5]="workplace.id !== activeWorkplaceId()"
              (click)="selectWorkplace(workplace.id)">
              @if (workplace.id === activeWorkplaceId()) {
                <div class="absolute inset-y-0 left-0 w-1 bg-primary rounded-r"></div>
              }
              <div [class.ml-2]="workplace.id === activeWorkplaceId()" class="flex items-center justify-center">
                <lucide-icon [img]="RocketIcon" [size]="20" class="text-primary"></lucide-icon>
              </div>
              @if (!collapsed()) {
                <span class="flex-1 text-left truncate font-medium">{{ workplace.name }}</span>
                <span class="badge badge-sm badge-primary">{{ workplace.columns.length }}</span>
              }
            </button>
          }
        </div>

        <!-- Add Workplace Button -->
        @if (!collapsed()) {
          <button class="w-full btn btn-outline btn-sm gap-2 mt-4 hover:btn-primary transition-all duration-200">
            <lucide-icon [img]="PlusIcon" [size]="16"></lucide-icon>
            <span>Nouveau workplace</span>
          </button>
        } @else {
          <button class="w-full btn btn-ghost btn-sm mt-4">
            <lucide-icon [img]="PlusIcon" [size]="20"></lucide-icon>
          </button>
        }
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-base-content/10">
        @if (!collapsed()) {
          <div class="flex items-center gap-3 p-3 rounded-lg bg-base-content/5 hover:bg-base-content/10 transition-all cursor-pointer">
            <div class="avatar placeholder">
              <div class="bg-primary text-primary-content rounded-full w-10">
                <span class="text-sm font-bold">JD</span>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-sm truncate">John Doe</div>
              <div class="text-xs text-base-content/60">john.doe@example.com</div>
            </div>
          </div>
        } @else {
          <div class="avatar placeholder">
            <div class="bg-primary text-primary-content rounded-full w-10 mx-auto">
              <span class="text-sm font-bold">JD</span>
            </div>
          </div>
        }
      </div>
    </aside>

    <!-- Mobile Overlay -->
    @if (!collapsed() && isMobile()) {
      <div class="fixed inset-0 bg-black/50 z-40 md:hidden" (click)="toggleSidebar()"></div>
    }
  `,
})
export class Sidebar {
  readonly workplaces = input.required<Workplace[]>();
  readonly activeWorkplaceId = input.required<number>();
  readonly collapsed = input.required<boolean>();

  readonly workplaceSelected = output<number>();
  readonly sidebarToggled = output<void>();

  protected readonly RocketIcon = Rocket;
  protected readonly ChevronLeftIcon = ChevronLeft;
  protected readonly ChevronRightIcon = ChevronRight;
  protected readonly PlusIcon = Plus;

  protected selectWorkplace(id: number): void {
    this.workplaceSelected.emit(id);
  }

  protected toggleSidebar(): void {
    this.sidebarToggled.emit();
  }

  protected isMobile(): boolean {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  }
}
