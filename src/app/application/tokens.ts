import { InjectionToken } from "@angular/core";
import type { WorkplaceGateway } from "../domain/gateways";

export const WORKPLACE_GATEWAY_TOKEN = new InjectionToken<WorkplaceGateway>(
	"WorkplaceGateway",
);
