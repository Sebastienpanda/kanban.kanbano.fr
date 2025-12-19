import { inject, Injectable } from '@angular/core';
import { WorkplaceRepository } from '../../ports';
import { WorkplaceEntity } from '../../../domain/entities';
import { NotFoundError } from '../../../domain/errors';

export interface GetWorkplaceByIdInput {
  workplaceId: number;
}

@Injectable({ providedIn: 'root' })
export class GetWorkplaceByIdUseCase {
  private readonly workplaceRepository = inject(WorkplaceRepository);

  async execute(input: GetWorkplaceByIdInput): Promise<WorkplaceEntity> {
    const workplace = await this.workplaceRepository.findById(input.workplaceId);
    if (!workplace) {
      throw new NotFoundError(`Workplace with id ${input.workplaceId} not found`);
    }
    return workplace;
  }
}
