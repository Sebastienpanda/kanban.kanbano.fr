import type { Routes } from "@angular/router";
import { MainKanban } from "./main-kanban/main-kanban";

const routes: Routes = [
    {
        path: "",
        component: MainKanban,
    },
];

export default routes;
