import { WorkplaceEntity } from '../../domain/entities';

export abstract class WorkplaceRepository {
  abstract findAll(): Promise<WorkplaceEntity[]>;
  abstract findById(id: number): Promise<WorkplaceEntity | null>;
  abstract save(workplaces: WorkplaceEntity[]): Promise<void>;
  abstract saveOne(workplace: WorkplaceEntity): Promise<void>;
}
