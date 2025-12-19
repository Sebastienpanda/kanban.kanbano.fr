import { Injectable, inject } from '@angular/core';
import { WorkplaceRepository } from '../../application/ports';
import { WorkplaceEntity } from '../../domain/entities';
import { LocalStorageAdapter } from '../adapters/storage';
import { WorkplaceMapper, WorkplacePersistence } from '../mappers';
import { DEFAULT_WORKPLACES } from '../fixtures';

const STORAGE_KEY = 'workplaces';

@Injectable({ providedIn: 'root' })
export class LocalStorageWorkplaceRepository implements WorkplaceRepository {
  private readonly storage = inject(LocalStorageAdapter);

  async findAll(): Promise<WorkplaceEntity[]> {
    const raw = this.storage.getItem(STORAGE_KEY);

    if (!raw || raw === 'undefined') {
      return WorkplaceMapper.toDomainList(DEFAULT_WORKPLACES);
    }

    try {
      const parsed: WorkplacePersistence[] = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return WorkplaceMapper.toDomainList(DEFAULT_WORKPLACES);
      }
      return WorkplaceMapper.toDomainList(parsed);
    } catch (error) {
      console.error('Failed to parse workplaces from localStorage', error);
      this.storage.removeItem(STORAGE_KEY);
      return WorkplaceMapper.toDomainList(DEFAULT_WORKPLACES);
    }
  }

  async findById(id: number): Promise<WorkplaceEntity | null> {
    const workplaces = await this.findAll();
    return workplaces.find(w => w.id === id) || null;
  }

  async save(workplaces: WorkplaceEntity[]): Promise<void> {
    const persistence = WorkplaceMapper.toPersistenceList(workplaces);
    this.storage.setItem(STORAGE_KEY, JSON.stringify(persistence));
  }

  async saveOne(workplace: WorkplaceEntity): Promise<void> {
    const workplaces = await this.findAll();
    const index = workplaces.findIndex(w => w.id === workplace.id);

    if (index !== -1) {
      workplaces[index] = workplace;
    } else {
      workplaces.push(workplace);
    }

    await this.save(workplaces);
  }
}
