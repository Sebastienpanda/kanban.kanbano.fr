import { type ApplicationConfig, provideBrowserGlobalErrorListeners } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { ALL_WORKSPACES_GATEWAY, FIND_ONE_WORKSPACE_GATEWAY } from "@application/tokens";
import { InMemoryWorkspacesKanban } from "@infra/in-memory-workspaces-kanban";

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        {
            provide: FIND_ONE_WORKSPACE_GATEWAY,
            useClass: InMemoryWorkspacesKanban,
        },
        {
            provide: ALL_WORKSPACES_GATEWAY,
            useClass: InMemoryWorkspacesKanban,
        },
    ],
};
