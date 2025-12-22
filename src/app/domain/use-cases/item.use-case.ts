import { Injectable } from "@angular/core";

export interface CreateItemInput {
	workplaceId: number;
	columnId: number;
	title: string;
}

@Injectable({ providedIn: "root" })
export class ItemUseCase {}
