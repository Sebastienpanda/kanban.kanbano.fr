import { EntityId } from '../value-objects/entity-id.vo';
import { Title } from '../value-objects/title.vo';

export class KanbanItemEntity {
  private constructor(
    private readonly _id: EntityId,
    private _title: Title
  ) {}

  static create(params: { id: number; title: string }): KanbanItemEntity {
    const id = EntityId.create(params.id);
    const title = Title.create(params.title);

    return new KanbanItemEntity(id, title);
  }

  static reconstitute(params: { id: number; title: string }): KanbanItemEntity {
    return new KanbanItemEntity(
      EntityId.reconstitute(params.id),
      Title.reconstitute(params.title)
    );
  }

  get id(): number {
    return this._id.value;
  }

  get title(): string {
    return this._title.value;
  }

  updateTitle(newTitle: string): void {
    this._title = Title.create(newTitle);
  }

  toJSON(): { id: number; title: string } {
    return {
      id: this.id,
      title: this.title,
    };
  }
}
