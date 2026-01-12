import { InjectionToken } from "@angular/core";
import { WorkspacesGateway } from "@domain/gateways/workspaces.gateway";

export const FIND_ONE_WORKSPACE_GATEWAY = new InjectionToken<WorkspacesGateway>("FindOneWorkspaceGateway");
export const ALL_WORKSPACES_GATEWAY = new InjectionToken<WorkspacesGateway>("FindAllWorkspacesGateway");
