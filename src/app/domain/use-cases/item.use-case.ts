import { inject, Injectable } from "@angular/core";
import { map, type Observable, switchMap } from "rxjs";
import { WORKPLACE_GATEWAY_TOKEN } from "../../application/tokens";
import type { KanbanItem, Workplace } from "../models";

export interface CreateItemInput {
	workplaceId: number;
	columnId: number;
	title: string;
}

export interface UpdateItemInput {
	workplaceId: number;
	columnId: number;
	itemId: number;
	title: string;
}

export interface DeleteItemInput {
	workplaceId: number;
	columnId: number;
	itemId: number;
}

export interface MoveItemInput {
	workplaceId: number;
	sourceColumnId: number;
	targetColumnId: number;
	itemId: number;
	newIndex: number;
}

@Injectable({ providedIn: "root" })
export class ItemUseCase {
	private readonly workplaceGateway = inject(WORKPLACE_GATEWAY_TOKEN);

	create(input: CreateItemInput): Observable<KanbanItem> {
		return this.workplaceGateway.findById(input.workplaceId).pipe(
			map((workplace) => {
				if (!workplace) throw new Error("Workplace not found");

				const column = workplace.columns.find((c) => c.id === input.columnId);
				if (!column) throw new Error("Column not found");

				const newId = this.generateNextId(workplace);
				const newItem: KanbanItem = { id: newId, title: input.title };

				column.items.push(newItem);
				return { workplace, newItem };
			}),
			switchMap(({ workplace, newItem }) =>
				this.workplaceGateway.saveOne(workplace).pipe(map(() => newItem)),
			),
		);
	}

	update(input: UpdateItemInput): Observable<void> {
		return this.workplaceGateway.findById(input.workplaceId).pipe(
			map((workplace) => {
				if (!workplace) throw new Error("Workplace not found");

				const column = workplace.columns.find((c) => c.id === input.columnId);
				if (!column) throw new Error("Column not found");

				const item = column.items.find((i) => i.id === input.itemId);
				if (!item) throw new Error("Item not found");

				item.title = input.title;
				return workplace;
			}),
			switchMap((workplace) => this.workplaceGateway.saveOne(workplace)),
		);
	}

	delete(input: DeleteItemInput): Observable<void> {
		return this.workplaceGateway.findById(input.workplaceId).pipe(
			map((workplace) => {
				if (!workplace) throw new Error("Workplace not found");

				const column = workplace.columns.find((c) => c.id === input.columnId);
				if (!column) throw new Error("Column not found");

				column.items = column.items.filter((i) => i.id !== input.itemId);
				return workplace;
			}),
			switchMap((workplace) => this.workplaceGateway.saveOne(workplace)),
		);
	}

	move(input: MoveItemInput): Observable<void> {
		return this.workplaceGateway.findById(input.workplaceId).pipe(
			map((workplace) => {
				if (!workplace) throw new Error("Workplace not found");

				const sourceColumn = workplace.columns.find(
					(c) => c.id === input.sourceColumnId,
				);
				const targetColumn = workplace.columns.find(
					(c) => c.id === input.targetColumnId,
				);

				if (!sourceColumn || !targetColumn) throw new Error("Column not found");

				const itemIndex = sourceColumn.items.findIndex(
					(i) => i.id === input.itemId,
				);
				if (itemIndex === -1) throw new Error("Item not found");

				const [item] = sourceColumn.items.splice(itemIndex, 1);
				targetColumn.items.splice(input.newIndex, 0, item);

				return workplace;
			}),
			switchMap((workplace) => this.workplaceGateway.saveOne(workplace)),
		);
	}

	private generateNextId(workplace: Workplace): number {
		let maxId = 0;
		workplace.columns.forEach((column) => {
			column.items.forEach((item) => {
				if (item.id > maxId) maxId = item.id;
			});
		});
		return maxId + 1;
	}
}
