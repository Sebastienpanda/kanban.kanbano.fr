import type { Routes } from "@angular/router";
import { KanbanLayout } from "@application/kanban-layout/kanban-layout";

const routes: Routes = [
    {
        path: "",
        component: KanbanLayout,
    },
];

export default routes;
