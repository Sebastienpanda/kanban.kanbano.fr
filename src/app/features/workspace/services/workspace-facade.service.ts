import { Injectable, inject, signal } from '@angular/core';
import { GetWorkplacesUseCase } from '../../../core/application/use-cases';
import { WorkplaceEntity } from '../../../core/domain/entities';

@Injectable({ providedIn: 'root' })
export class WorkspaceFacadeService {
  private readonly getWorkplacesUseCase = inject(GetWorkplacesUseCase);

  // State
  readonly workplaces = signal<WorkplaceEntity[]>([]);
  readonly activeWorkplaceId = signal<number>(1);

  async loadWorkplaces(): Promise<void> {
    const workplaces = await this.getWorkplacesUseCase.execute();
    this.workplaces.set(workplaces);
  }

  selectWorkplace(workplaceId: number): void {
    this.activeWorkplaceId.set(workplaceId);
  }
}
