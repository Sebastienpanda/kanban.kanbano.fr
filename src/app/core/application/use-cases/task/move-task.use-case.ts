import { inject, Injectable } from '@angular/core';
import { WorkplaceRepository } from '../../ports';
import { NotFoundError } from '../../../domain/errors';

export interface MoveTaskInput {
  workplaceId: number;
  sourceColumnId: number;
  targetColumnId: number;
  taskId: number;
  newIndex: number;
}

@Injectable({ providedIn: 'root' })
export class MoveTaskUseCase {
  private readonly workplaceRepository = inject(WorkplaceRepository);

  async execute(input: MoveTaskInput): Promise<void> {
    const workplace = await this.workplaceRepository.findById(input.workplaceId);
    if (!workplace) {
      throw new NotFoundError(`Workplace with id ${input.workplaceId} not found`);
    }

    const sourceColumn = workplace.findColumn(input.sourceColumnId);
    const targetColumn = workplace.findColumn(input.targetColumnId);

    // Find and remove from source
    const itemIndex = Array.from(sourceColumn.items).findIndex(
      item => item.id === input.taskId
    );
    if (itemIndex === -1) {
      throw new NotFoundError(`Task with id ${input.taskId} not found`);
    }

    const items = Array.from(sourceColumn.items);
    const [movedItem] = items.splice(itemIndex, 1);

    if (input.sourceColumnId === input.targetColumnId) {
      // Same column reorder
      items.splice(input.newIndex, 0, movedItem);
      sourceColumn.replaceItems(items);
    } else {
      // Cross-column move
      sourceColumn.replaceItems(items);
      const targetItems = Array.from(targetColumn.items);
      targetItems.splice(input.newIndex, 0, movedItem);
      targetColumn.replaceItems(targetItems);
    }

    await this.workplaceRepository.saveOne(workplace);
  }
}
