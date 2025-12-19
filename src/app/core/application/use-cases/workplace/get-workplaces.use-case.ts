import { inject, Injectable } from '@angular/core';
import { WorkplaceRepository } from '../../ports';
import { WorkplaceEntity } from '../../../domain/entities';

@Injectable({ providedIn: 'root' })
export class GetWorkplacesUseCase {
  private readonly workplaceRepository = inject(WorkplaceRepository);

  async execute(): Promise<WorkplaceEntity[]> {
    return await this.workplaceRepository.findAll();
  }
}
