import type { Item } from "./kanban-item.model";

export type Column = {
    id: string;
    title: string;
    items: Item[];
};
