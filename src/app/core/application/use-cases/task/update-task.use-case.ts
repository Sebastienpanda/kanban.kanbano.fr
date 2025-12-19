import { inject, Injectable } from '@angular/core';
import { WorkplaceRepository } from '../../ports';
import { NotFoundError } from '../../../domain/errors';

export interface UpdateTaskInput {
  workplaceId: number;
  columnId: number;
  taskId: number;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class UpdateTaskUseCase {
  private readonly workplaceRepository = inject(WorkplaceRepository);

  async execute(input: UpdateTaskInput): Promise<void> {
    const workplace = await this.workplaceRepository.findById(input.workplaceId);
    if (!workplace) {
      throw new NotFoundError(`Workplace with id ${input.workplaceId} not found`);
    }

    const column = workplace.findColumn(input.columnId);
    column.updateItem(input.taskId, input.title);

    await this.workplaceRepository.saveOne(workplace);
  }
}
