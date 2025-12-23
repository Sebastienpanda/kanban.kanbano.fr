import { type ApplicationConfig, provideBrowserGlobalErrorListeners } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { GET_COLUMNS_GATEWAY } from "./application/tokens";
import { InMemoryKanban } from "./infra/in-memory-kanban";

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        {
            provide: GET_COLUMNS_GATEWAY,
            useClass: InMemoryKanban,
        },
    ],
};
