import { InjectionToken } from "@angular/core";
import type { ColumnsGateway } from "@domain/gateways/columns.gateway";

export const GET_COLUMNS_GATEWAY = new InjectionToken<ColumnsGateway>("GetColumnsGateway");
