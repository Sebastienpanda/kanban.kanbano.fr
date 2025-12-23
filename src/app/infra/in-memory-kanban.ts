import { Injectable } from "@angular/core";
import type { ColumnsGateway } from "@domain/gateways/columns.gateway";
import type { Column } from "@domain/models/kanban-column.model";
import { BehaviorSubject, defer, type Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class InMemoryKanban implements ColumnsGateway {
    private readonly _columns = new BehaviorSubject<Column[]>([
        {
            id: crypto.randomUUID(),
            title: "Todo",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Ceci est ma tâche",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "En Attente",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Ceci est ma tâche",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "A faire",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Ceci est ma tâche",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "A faire",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Ceci est ma tâche",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "A faire",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Ceci est ma tâche",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "A faire",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Ceci est ma tâche",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "A faire",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Ceci est ma tâche",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "A faire",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Ceci est ma tâche",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "A faire",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Ceci est ma tâche",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "A faire",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Ceci est ma tâche",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "A faire",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Ceci est ma tâche",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "A faire",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Ceci est ma tâche",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "A faire",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Ceci est ma tâche",
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "Done",
            items: [
                {
                    id: crypto.randomUUID(),
                    title: "Ceci est ma deuxième tâche",
                },
            ],
        },
    ]);

    getAll(): Observable<Column[]> {
        return defer(() => this._columns.asObservable());
    }
}
