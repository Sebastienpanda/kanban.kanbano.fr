import { Injectable } from "@angular/core";
import { BehaviorSubject, defer, Observable } from "rxjs";
import { WorkspacesGateway } from "@domain/gateways/workspaces.gateway";
import { Workspaces } from "@domain/models/kanban-workspaces.model";

@Injectable({
    providedIn: "root",
})
export class InMemoryWorkspacesKanban implements WorkspacesGateway {
    private readonly _fullWorkspaces = [
        {
            id: "09e70007-8630-4948-a234-d8d020c5de6e",
            name: "Bernard GIE",
            createdAt: "2026-01-11 15:21:41.806+00",
            updatedAt: null,
            columns: [
                {
                    id: "6629282b-5657-419d-bb1c-cc967e81b91c",
                    name: "À faire",
                    workspaceId: "09e70007-8630-4948-a234-d8d020c5de6e",
                    position: 0,
                    createdAt: "2026-01-11T15:21:41.885+00:00",
                    updatedAt: null,
                    tasks: [
                        {
                            id: "1c9e7293-1d8d-4ec5-ada6-7389e5954327",
                            title: "Sit ut labore esse nobis. - À faire #1",
                            description:
                                "Distinctio blanditiis quibusdam. Atque labore expedita magni accusantium ab exercitationem tempora perspiciatis nemo.",
                            status: "todo",
                            columnId: "6629282b-5657-419d-bb1c-cc967e81b91c",
                            order: 0,
                            createdAt: "2026-01-11T15:21:41.94167",
                            updatedAt: null,
                        },
                        {
                            id: "a316aa82-aaf0-4746-bce4-c8b54475049e",
                            title: "Ex ea aliquid enim numquam libero. - À faire #2",
                            description:
                                "Modi dignissimos consequuntur. Neque laudantium nihil enim hic. Aperiam aperiam cumque mollitia ex modi eum.",
                            status: "todo",
                            columnId: "6629282b-5657-419d-bb1c-cc967e81b91c",
                            order: 1,
                            createdAt: "2026-01-11T15:21:41.972105",
                            updatedAt: null,
                        },
                        {
                            id: "e4adef33-0787-4d23-8f8c-624a6f7232a0",
                            title: "Pariatur asperiores harum dicta. - À faire #3",
                            description:
                                "Quo esse corrupti laboriosam quae vel. Facilis illo ullam voluptatem id voluptatibus quibusdam id. Omnis nostrum dignissimos incidunt soluta fuga aliquam iure facilis.",
                            status: "todo",
                            columnId: "6629282b-5657-419d-bb1c-cc967e81b91c",
                            order: 2,
                            createdAt: "2026-01-11T15:21:41.990079",
                            updatedAt: null,
                        },
                        {
                            id: "2e53e0ae-0787-458d-b38f-24f94f90eae6",
                            title: "In impedit eveniet error. - À faire #4",
                            description: "Nisi alias quam. Labore nostrum rerum laudantium praesentium id.",
                            status: "todo",
                            columnId: "6629282b-5657-419d-bb1c-cc967e81b91c",
                            order: 3,
                            createdAt: "2026-01-11T15:21:42.006447",
                            updatedAt: null,
                        },
                        {
                            id: "e85877cf-4dce-4ac3-9641-d68786df34de",
                            title: "Illum distinctio nulla iste iure rerum. - À faire #5",
                            description:
                                "Laborum quae exercitationem nisi iste. Explicabo itaque nam dolorem illo. Totam itaque et voluptatibus esse.",
                            status: "todo",
                            columnId: "6629282b-5657-419d-bb1c-cc967e81b91c",
                            order: 4,
                            createdAt: "2026-01-11T15:21:42.022741",
                            updatedAt: null,
                        },
                        {
                            id: "a8908779-1cf6-4d6b-ac66-a0cb83452a18",
                            title: "Aspernatur deleniti consectetur id commodi repellendus ipsam ipsum. - À faire #6",
                            description:
                                "Recusandae repellat distinctio assumenda eveniet laudantium veniam dolorem sed similique. Itaque veniam illum sed.",
                            status: "todo",
                            columnId: "6629282b-5657-419d-bb1c-cc967e81b91c",
                            order: 5,
                            createdAt: "2026-01-11T15:21:42.03986",
                            updatedAt: null,
                        },
                        {
                            id: "095435c7-e01f-44c8-86dc-957564af3a22",
                            title: "Eaque voluptate dolorem reprehenderit voluptatem tempore fuga. - À faire #7",
                            description:
                                "Cupiditate reprehenderit alias occaecati. Assumenda ipsum eius veniam minus asperiores. Eaque accusantium sint est nam.",
                            status: "todo",
                            columnId: "6629282b-5657-419d-bb1c-cc967e81b91c",
                            order: 6,
                            createdAt: "2026-01-11T15:21:42.056155",
                            updatedAt: null,
                        },
                        {
                            id: "454dd8a1-4aca-40dd-893e-233b42e04dd2",
                            title: "Dolorem omnis quos optio accusamus ducimus totam pariatur. - À faire #8",
                            description: "In voluptatem vitae et vitae ratione perspiciatis dolore harum officia.",
                            status: "todo",
                            columnId: "6629282b-5657-419d-bb1c-cc967e81b91c",
                            order: 7,
                            createdAt: "2026-01-11T15:21:42.072562",
                            updatedAt: null,
                        },
                    ],
                },
                {
                    id: "cc71c2fc-cd57-41a4-9838-974664caf776",
                    name: "En cours",
                    workspaceId: "09e70007-8630-4948-a234-d8d020c5de6e",
                    position: 1,
                    createdAt: "2026-01-11T15:21:41.905+00:00",
                    updatedAt: null,
                    tasks: [
                        {
                            id: "289c0897-7630-4246-a4e8-6093e41c599b",
                            title: "Id occaecati atque saepe soluta labore assumenda repellendus. - En cours #1",
                            description:
                                "Inventore quod atque placeat numquam quam saepe. Necessitatibus voluptates tenetur.",
                            status: "in_progress",
                            columnId: "cc71c2fc-cd57-41a4-9838-974664caf776",
                            order: 0,
                            createdAt: "2026-01-11T15:21:42.089053",
                            updatedAt: null,
                        },
                        {
                            id: "3af931b8-fe1a-425e-994e-0b854e960941",
                            title: "Nemo commodi illum soluta eaque. - En cours #2",
                            description:
                                "Repellat excepturi provident vel et quos soluta. Corporis inventore aperiam ab.",
                            status: "in_progress",
                            columnId: "cc71c2fc-cd57-41a4-9838-974664caf776",
                            order: 1,
                            createdAt: "2026-01-11T15:21:42.105096",
                            updatedAt: null,
                        },
                        {
                            id: "2f6ffd7a-d6a1-497c-8b43-88eadcaac33c",
                            title: "Inventore omnis cum. - En cours #3",
                            description:
                                "Sint aperiam accusamus natus voluptatibus. Et odio qui. Voluptas tempore a repudiandae accusantium.",
                            status: "in_progress",
                            columnId: "cc71c2fc-cd57-41a4-9838-974664caf776",
                            order: 2,
                            createdAt: "2026-01-11T15:21:42.120675",
                            updatedAt: null,
                        },
                    ],
                },
                {
                    id: "7fe507d5-d565-4bd1-986b-fb91abad6322",
                    name: "Terminé",
                    workspaceId: "09e70007-8630-4948-a234-d8d020c5de6e",
                    position: 2,
                    createdAt: "2026-01-11T15:21:41.921+00:00",
                    updatedAt: null,
                    tasks: [
                        {
                            id: "79d80a44-14a0-41d0-9ee9-f055ed9f32f9",
                            title: "Unde nemo sequi deleniti. - Terminé #1",
                            description:
                                "Sed ipsa omnis. Exercitationem cumque odio voluptate repellendus reprehenderit aut. Quibusdam impedit velit.",
                            status: "done",
                            columnId: "7fe507d5-d565-4bd1-986b-fb91abad6322",
                            order: 0,
                            createdAt: "2026-01-11T15:21:42.136926",
                            updatedAt: null,
                        },
                        {
                            id: "cb04c933-0cb0-4372-b033-7abd547b28e8",
                            title: "Corrupti alias quam doloremque ad deserunt sunt. - Terminé #2",
                            description:
                                "Harum laboriosam commodi corrupti. Perspiciatis deserunt hic dolor. Numquam officia fugiat quidem doloribus tempore.",
                            status: "done",
                            columnId: "7fe507d5-d565-4bd1-986b-fb91abad6322",
                            order: 1,
                            createdAt: "2026-01-11T15:21:42.153512",
                            updatedAt: null,
                        },
                    ],
                },
            ],
        },
    ];

    findAll(): Observable<Workspaces[]> {
        const basicWorkspaces = this._fullWorkspaces.map((w) => ({
            id: w.id,
            name: w.name,
            createdAt: w.createdAt,
            updatedAt: w.updatedAt,
            columns: [],
        }));

        return defer(() => new BehaviorSubject(basicWorkspaces).asObservable());
    }

    findOne(id: string): Observable<Workspaces> {
        const workspace = this._fullWorkspaces.find((w) => w.id === id) as Workspaces;
        if (!workspace) {
            throw new Error(`Workspace ${id} introuvable`);
        }
        return defer(() => new BehaviorSubject<Workspaces>(workspace).asObservable());
    }
}
