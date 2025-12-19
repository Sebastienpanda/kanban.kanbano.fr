import { inject, Injectable } from '@angular/core';
import { WorkplaceRepository } from '../../ports';
import { NotFoundError } from '../../../domain/errors';

export interface ReorderColumnsInput {
  workplaceId: number;
  previousIndex: number;
  currentIndex: number;
}

@Injectable({ providedIn: 'root' })
export class ReorderColumnsUseCase {
  private readonly workplaceRepository = inject(WorkplaceRepository);

  async execute(input: ReorderColumnsInput): Promise<void> {
    const workplace = await this.workplaceRepository.findById(input.workplaceId);
    if (!workplace) {
      throw new NotFoundError(`Workplace with id ${input.workplaceId} not found`);
    }

    const columns = Array.from(workplace.columns);
    const [movedColumn] = columns.splice(input.previousIndex, 1);
    columns.splice(input.currentIndex, 0, movedColumn);

    workplace.replaceColumns(columns);
    await this.workplaceRepository.saveOne(workplace);
  }
}
