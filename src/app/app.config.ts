import { type ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { ALL_WORKSPACES_GATEWAY, FIND_ONE_WORKSPACE_GATEWAY } from "@application/tokens";
import { InMemoryWorkspacesKanban } from "@infra/in-memory-workspaces-kanban";
import localeFr from "@angular/common/locales/fr";

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        {
            provide: LOCALE_ID,
            useFactory: () => navigator.language || "fr",
        },
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
