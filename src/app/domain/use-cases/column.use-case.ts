import { inject, Injectable } from "@angular/core";
import { map, type Observable, switchMap } from "rxjs";
import { WORKPLACE_GATEWAY_TOKEN } from "../../application/tokens";

export interface ReorderColumnsInput {
	workplaceId: number;
	previousIndex: number;
	currentIndex: number;
}

@Injectable({ providedIn: "root" })
export class ColumnUseCase {
	private readonly workplaceGateway = inject(WORKPLACE_GATEWAY_TOKEN);

	reorder(input: ReorderColumnsInput): Observable<void> {
		return this.workplaceGateway.findById(input.workplaceId).pipe(
			map((workplace) => {
				if (!workplace) throw new Error("Workplace not found");

				const columns = [...workplace.columns];
				const [removed] = columns.splice(input.previousIndex, 1);
				columns.splice(input.currentIndex, 0, removed);

				workplace.columns = columns;
				return workplace;
			}),
			switchMap((workplace) => this.workplaceGateway.saveOne(workplace)),
		);
	}
}
