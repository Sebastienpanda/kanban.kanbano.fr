import type { KanbanItem } from "./kanban-item.model";

export interface KanbanColumn {
	id: number;
	title: string;
	items: KanbanItem[];
}
