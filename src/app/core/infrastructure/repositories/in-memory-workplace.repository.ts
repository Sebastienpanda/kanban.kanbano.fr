import { Injectable } from '@angular/core';
import { WorkplaceRepository } from '../../application/ports';
import { WorkplaceEntity } from '../../domain/entities';
import { WorkplaceMapper } from '../mappers';
import { DEFAULT_WORKPLACES } from '../fixtures';

@Injectable({ providedIn: 'root' })
export class InMemoryWorkplaceRepository implements WorkplaceRepository {
  private workplaces: WorkplaceEntity[] = WorkplaceMapper.toDomainList(DEFAULT_WORKPLACES);

  async findAll(): Promise<WorkplaceEntity[]> {
    return [...this.workplaces];
  }

  async findById(id: number): Promise<WorkplaceEntity | null> {
    return this.workplaces.find(w => w.id === id) || null;
  }

  async save(workplaces: WorkplaceEntity[]): Promise<void> {
    this.workplaces = [...workplaces];
  }

  async saveOne(workplace: WorkplaceEntity): Promise<void> {
    const index = this.workplaces.findIndex(w => w.id === workplace.id);
    if (index !== -1) {
      this.workplaces[index] = workplace;
    } else {
      this.workplaces.push(workplace);
    }
  }
}
