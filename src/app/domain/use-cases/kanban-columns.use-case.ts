import type { Observable } from "rxjs";
import type { ColumnsGateway } from "../gateways/columns.gateway";
import type { Columns } from "../models/kanban-columns.model";

export class KanbanColumnsUseCase {
    constructor(private readonly _gateway: ColumnsGateway) {}

    all(): Observable<Columns[]> {
        return this._gateway.getAll();
    }
}
