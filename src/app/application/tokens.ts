import { InjectionToken } from "@angular/core";
import type { ThemeGateway, WorkplaceGateway } from "../domain/gateways";

export const WORKPLACE_GATEWAY_TOKEN = new InjectionToken<WorkplaceGateway>(
	"WorkplaceGateway",
);

export const THEME_GATEWAY_TOKEN = new InjectionToken<ThemeGateway>(
	"ThemeGateway",
);
