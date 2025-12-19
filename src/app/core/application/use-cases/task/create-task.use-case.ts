import { inject, Injectable } from '@angular/core';
import { WorkplaceRepository } from '../../ports';
import { KanbanItemEntity } from '../../../domain/entities';
import { NotFoundError } from '../../../domain/errors';

export interface CreateTaskInput {
  workplaceId: number;
  columnId: number;
  title: string;
}

export interface CreateTaskOutput {
  taskId: number;
  workplaceId: number;
  columnId: number;
}

@Injectable({ providedIn: 'root' })
export class CreateTaskUseCase {
  private readonly workplaceRepository = inject(WorkplaceRepository);

  async execute(input: CreateTaskInput): Promise<CreateTaskOutput> {
    // Retrieve workplace
    const workplace = await this.workplaceRepository.findById(input.workplaceId);
    if (!workplace) {
      throw new NotFoundError(`Workplace with id ${input.workplaceId} not found`);
    }

    // Find column
    const column = workplace.findColumn(input.columnId);

    // Generate new ID
    const newItemId = workplace.generateNextItemId();

    // Create new task entity
    const newItem = KanbanItemEntity.create({
      id: newItemId,
      title: input.title,
    });

    // Add to column
    column.addItem(newItem);

    // Save workplace
    await this.workplaceRepository.saveOne(workplace);

    return {
      taskId: newItemId,
      workplaceId: input.workplaceId,
      columnId: input.columnId,
    };
  }
}
