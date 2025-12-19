import { inject, Injectable } from '@angular/core';
import { WorkplaceRepository } from '../../ports';
import { NotFoundError } from '../../../domain/errors';

export interface DeleteTaskInput {
  workplaceId: number;
  columnId: number;
  taskId: number;
}

@Injectable({ providedIn: 'root' })
export class DeleteTaskUseCase {
  private readonly workplaceRepository = inject(WorkplaceRepository);

  async execute(input: DeleteTaskInput): Promise<void> {
    const workplace = await this.workplaceRepository.findById(input.workplaceId);
    if (!workplace) {
      throw new NotFoundError(`Workplace with id ${input.workplaceId} not found`);
    }

    const column = workplace.findColumn(input.columnId);
    column.removeItem(input.taskId);

    await this.workplaceRepository.saveOne(workplace);
  }
}
