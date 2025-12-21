import type { Observable } from "rxjs";
import type { Workplace } from "../models";

export interface WorkplaceGateway {
	// Lecture
	findAll(): Observable<Workplace[]>;

	findById(id: number): Observable<Workplace | null>;

	// Écriture
	save(workplaces: Workplace[]): Observable<void>;

	saveOne(workplace: Workplace): Observable<void>;
}
