import { type ApplicationConfig, provideBrowserGlobalErrorListeners, } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { THEME_GATEWAY_TOKEN, WORKPLACE_GATEWAY_TOKEN, } from "./application/tokens";
import { InMemoryThemeGateway, InMemoryWorkplaceGateway, } from "./infra/in-memory";

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),

		// Gateways - InMemory implementations
		{
			provide: WORKPLACE_GATEWAY_TOKEN,
			useClass: InMemoryWorkplaceGateway,
		},
		{
			provide: THEME_GATEWAY_TOKEN,
			useClass: InMemoryThemeGateway,
		},
	],
};
