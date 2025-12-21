import type { KanbanColumn } from "./kanban-column.model";

export interface Workplace {
	id: number;
	name: string;
	icon: string;
	columns: KanbanColumn[];
}
