import type { Column } from "@domain/models/kanban-column.model";
import type { Observable } from "rxjs";

export interface ColumnsGateway {
    getAll(): Observable<Column[]>;
}
