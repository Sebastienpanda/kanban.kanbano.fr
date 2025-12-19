import { ValidationError } from '../errors';
import { EntityId } from '../value-objects/entity-id.vo';
import { Title } from '../value-objects/title.vo';
import { KanbanItemEntity } from './kanban-item.entity';

export class KanbanColumnEntity {
  private constructor(
    private readonly _id: EntityId,
    private _title: Title,
    private _items: KanbanItemEntity[]
  ) {}

  static create(params: {
    id: number;
    title: string;
    items: KanbanItemEntity[];
  }): KanbanColumnEntity {
    return new KanbanColumnEntity(
      EntityId.create(params.id),
      Title.create(params.title),
      params.items
    );
  }

  static reconstitute(params: {
    id: number;
    title: string;
    items: KanbanItemEntity[];
  }): KanbanColumnEntity {
    return new KanbanColumnEntity(
      EntityId.reconstitute(params.id),
      Title.reconstitute(params.title),
      params.items
    );
  }

  get id(): number {
    return this._id.value;
  }

  get title(): string {
    return this._title.value;
  }

  get items(): ReadonlyArray<KanbanItemEntity> {
    return Object.freeze([...this._items]);
  }

  addItem(item: KanbanItemEntity): void {
    this._items.push(item);
  }

  removeItem(itemId: number): void {
    this._items = this._items.filter(item => item.id !== itemId);
  }

  updateItem(itemId: number, newTitle: string): void {
    const item = this._items.find(i => i.id === itemId);
    if (!item) {
      throw new ValidationError(`Item with id ${itemId} not found in column`);
    }
    item.updateTitle(newTitle);
  }

  replaceItems(items: KanbanItemEntity[]): void {
    this._items = [...items];
  }

  toJSON(): { id: number; title: string; items: any[] } {
    return {
      id: this.id,
      title: this.title,
      items: this._items.map(item => item.toJSON()),
    };
  }
}
