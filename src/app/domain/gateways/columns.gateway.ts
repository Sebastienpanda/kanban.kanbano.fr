import type { Columns } from "@domain/models/kanban-columns.model";
import type { Observable } from "rxjs";

export interface ColumnsGateway {
    getAll(): Observable<Columns[]>;
}
