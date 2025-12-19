import { WorkplaceEntity, KanbanColumnEntity, KanbanItemEntity } from '../../domain/entities';

export interface WorkplacePersistence {
  id: number;
  name: string;
  icon: string;
  columns: ColumnPersistence[];
}

export interface ColumnPersistence {
  id: number;
  title: string;
  items: ItemPersistence[];
}

export interface ItemPersistence {
  id: number;
  title: string;
}

export class WorkplaceMapper {
  static toDomain(raw: WorkplacePersistence): WorkplaceEntity {
    const columns = raw.columns.map(col =>
      KanbanColumnEntity.reconstitute({
        id: col.id,
        title: col.title,
        items: col.items.map(item =>
          KanbanItemEntity.reconstitute({
            id: item.id,
            title: item.title,
          })
        ),
      })
    );

    return WorkplaceEntity.reconstitute({
      id: raw.id,
      name: raw.name,
      icon: raw.icon,
      columns,
    });
  }

  static toPersistence(workplace: WorkplaceEntity): WorkplacePersistence {
    return workplace.toJSON();
  }

  static toDomainList(raw: WorkplacePersistence[]): WorkplaceEntity[] {
    return raw.map(w => this.toDomain(w));
  }

  static toPersistenceList(workplaces: WorkplaceEntity[]): WorkplacePersistence[] {
    return workplaces.map(w => this.toPersistence(w));
  }
}
