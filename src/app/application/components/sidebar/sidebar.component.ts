import { Component, input, output } from "@angular/core";
import { ChevronLeft, ChevronRight, LucideAngularModule, MessageCircle, Plus, Rocket, } from "lucide-angular";
import type { Workplace } from "../../../domain/models";

@Component({
	selector: "app-sidebar",
	imports: [LucideAngularModule],
	template: `
        <aside
            class="flex md:flex h-screen bg-base-300 flex-col shadow-xl border-r border-base-content/10 transition-all duration-300 ease-in-out fixed md:relative z-50 md:z-auto"
            [class.w-64]="!collapsed()"
            [class.w-20]="collapsed()"
            [class.-translate-x-full]="collapsed() && isMobile()"
            [class.translate-x-0]="!collapsed() || !isMobile()">
            <div class="p-4 flex items-center border-b border-base-content/10"
                 [class]="collapsed() ? 'justify-center': 'justify-between'">
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
                            class="w-full btn btn-ghost gap-3 group relative overflow-hidden transition-all duration-200"
                            [class]="collapsed() ? 'justify-center p-0': 'justify-start'"
                            [class.btn-active]="workplace.id === activeWorkplaceId()"
                            (click)="selectWorkplace(workplace.id)">
                            @if (workplace.id === activeWorkplaceId()) {
                                <div class="absolute inset-y-0 left-0 w-1 bg-primary rounded-r"></div>
                            }
                            <div [class.ml-2]="workplace.id === activeWorkplaceId()"
                                 class="flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-12">
                                <lucide-icon [img]="RocketIcon" [size]="20"
                                             class="text-primary group-hover:text-secondary transition-colors duration-200"></lucide-icon>
                            </div>
                            @if (!collapsed()) {
                                <span class="flex-1 text-left truncate font-medium">{{ workplace.name }}</span>
                                <span class="badge badge-sm badge-primary">{{ workplace.columns.length }}</span>
                            }
                        </button>
                    }
                </div>
            </div>

            <!-- Footer -->
            <div class="p-4 border-t border-base-content/10">
                @if (!collapsed()) {
                    <a href="https://discord.gg/Yghwwbku" target="_blank" rel="noopener noreferrer"
                       class="flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all cursor-pointer group">
                        <div
                            class="flex items-center justify-center bg-[#5865F2] text-white rounded-full w-10 h-10 group-hover:scale-110 transition-transform">
                            <lucide-icon [img]="DiscordIcon" [size]="24"></lucide-icon>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-semibold text-sm">Rejoindre le Discord</div>
                            <div class="text-xs text-base-content/60">Communauté & Support</div>
                        </div>
                    </a>
                } @else {
                    <a href="https://discord.gg/Yghwwbku" target="_blank" rel="noopener noreferrer"
                       class="flex justify-center group">
                        <div
                            class="flex items-center justify-center bg-[#5865F2] text-white rounded-full w-10 h-10 mx-auto hover:scale-110 transition-transform cursor-pointer">
                            <lucide-icon [img]="DiscordIcon" [size]="24"></lucide-icon>
                        </div>
                    </a>
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
	protected readonly DiscordIcon = MessageCircle;

	protected selectWorkplace(id: number): void {
		this.workplaceSelected.emit(id);
	}

	protected toggleSidebar(): void {
		this.sidebarToggled.emit();
	}

	protected isMobile(): boolean {
		return typeof window !== "undefined" && window.innerWidth < 768;
	}
}
