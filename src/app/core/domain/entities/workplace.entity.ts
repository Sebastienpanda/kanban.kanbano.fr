import { ValidationError, NotFoundError } from '../errors';
import { EntityId } from '../value-objects/entity-id.vo';
import { Title } from '../value-objects/title.vo';
import { KanbanColumnEntity } from './kanban-column.entity';

export class WorkplaceEntity {
  private constructor(
    private readonly _id: EntityId,
    private _name: Title,
    private readonly _icon: string,
    private _columns: KanbanColumnEntity[]
  ) {}

  static create(params: {
    id: number;
    name: string;
    icon: string;
    columns: KanbanColumnEntity[];
  }): WorkplaceEntity {
    if (!params.icon || params.icon.trim() === '') {
      throw new ValidationError('Icon cannot be empty');
    }

    return new WorkplaceEntity(
      EntityId.create(params.id),
      Title.create(params.name),
      params.icon.trim(),
      params.columns
    );
  }

  static reconstitute(params: {
    id: number;
    name: string;
    icon: string;
    columns: KanbanColumnEntity[];
  }): WorkplaceEntity {
    return new WorkplaceEntity(
      EntityId.reconstitute(params.id),
      Title.reconstitute(params.name),
      params.icon,
      params.columns
    );
  }

  get id(): number {
    return this._id.value;
  }

  get name(): string {
    return this._name.value;
  }

  get icon(): string {
    return this._icon;
  }

  get columns(): ReadonlyArray<KanbanColumnEntity> {
    return Object.freeze([...this._columns]);
  }

  findColumn(columnId: number): KanbanColumnEntity {
    const column = this._columns.find(col => col.id === columnId);
    if (!column) {
      throw new NotFoundError(`Column with id ${columnId} not found`);
    }
    return column;
  }

  replaceColumns(columns: KanbanColumnEntity[]): void {
    this._columns = [...columns];
  }

  generateNextItemId(): number {
    const allItems = this._columns.flatMap(col =>
      Array.from(col.items).map(item => item.id)
    );
    return allItems.length > 0 ? Math.max(...allItems) + 1 : 1;
  }

  toJSON(): { id: number; name: string; icon: string; columns: any[] } {
    return {
      id: this.id,
      name: this.name,
      icon: this.icon,
      columns: this._columns.map(col => col.toJSON()),
    };
  }
}
