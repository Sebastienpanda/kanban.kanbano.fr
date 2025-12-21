import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WORKPLACE_GATEWAY_TOKEN } from '../../application/tokens';
import { Workplace } from '../models';

@Injectable({providedIn: 'root'})
export class WorkplaceUseCase {
    private readonly workplaceGateway = inject(WORKPLACE_GATEWAY_TOKEN);

    getAll(): Observable<Workplace[]> {
        return this.workplaceGateway.findAll();
    }

    getById(id: number): Observable<Workplace | null> {
        return this.workplaceGateway.findById(id);
    }
}
