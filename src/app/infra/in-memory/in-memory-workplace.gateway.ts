import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, map, Observable } from "rxjs";
import type { WorkplaceGateway } from "../../domain/gateways";
import type { Workplace } from "../../domain/models";

const DEFAULT_WORKPLACES: Workplace[] = [
	{
		id: 1,
		name: "Mon Projet",
		icon: "rocket",
		columns: [
			{
				id: 1,
				title: "À faire",
				items: [
					{ id: 1, title: "Créer la page d'accueil" },
					{ id: 2, title: "Ajouter l'authentification" },
					{ id: 3, title: "Configurer la base de données" },
				],
			},
			{
				id: 2,
				title: "En cours",
				items: [
					{ id: 4, title: "Développement de l'API" },
					{ id: 5, title: "Intégration du frontend" },
				],
			},
			{
				id: 3,
				title: "Terminé",
				items: [
					{ id: 6, title: "Configuration du projet" },
					{ id: 7, title: "Installation des dépendances" },
				],
			},
		],
	},
];

@Injectable({ providedIn: "root" })
export class InMemoryWorkplaceGateway implements WorkplaceGateway {
	private readonly workplaces$ = new BehaviorSubject<Workplace[]>(
		JSON.parse(JSON.stringify(DEFAULT_WORKPLACES)), // Deep clone
	);

	findAll(): Observable<Workplace[]> {
		return this.workplaces$.asObservable().pipe(
			delay(100), // Simulate network delay
			map((workplaces) => JSON.parse(JSON.stringify(workplaces))), // Deep clone
		);
	}

	findById(id: number): Observable<Workplace | null> {
		return this.workplaces$.asObservable().pipe(
			delay(100),
			map((workplaces) => {
				const workplace = workplaces.find((w) => w.id === id);
				return workplace ? JSON.parse(JSON.stringify(workplace)) : null;
			}),
		);
	}

	save(workplaces: Workplace[]): Observable<void> {
		return new Observable((observer) => {
			setTimeout(() => {
				this.workplaces$.next(JSON.parse(JSON.stringify(workplaces)));
				observer.next();
				observer.complete();
			}, 100);
		});
	}

	saveOne(workplace: Workplace): Observable<void> {
		return new Observable((observer) => {
			setTimeout(() => {
				const current = this.workplaces$.value;
				const index = current.findIndex((w) => w.id === workplace.id);

				const updated = [...current];
				if (index !== -1) {
					updated[index] = JSON.parse(JSON.stringify(workplace));
				} else {
					updated.push(JSON.parse(JSON.stringify(workplace)));
				}

				this.workplaces$.next(updated);
				observer.next();
				observer.complete();
			}, 100);
		});
	}
}
