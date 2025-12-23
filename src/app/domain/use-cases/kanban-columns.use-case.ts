import type { Observable } from "rxjs";
import type { ColumnsGateway } from "../gateways/columns.gateway";
import type { Column } from "../models/kanban-column.model";

export class KanbanColumnsUseCase {
    constructor(private readonly _gateway: ColumnsGateway) {}

    all(): Observable<Column[]> {
        return this._gateway.getAll();
    }
}
