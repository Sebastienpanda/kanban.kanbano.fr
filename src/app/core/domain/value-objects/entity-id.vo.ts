import { ValidationError } from '../errors';

export class EntityId {
  private constructor(private readonly _value: number) {
    this.validate();
  }

  static create(value: number): EntityId {
    return new EntityId(value);
  }

  static reconstitute(value: number): EntityId {
    const id = Object.create(EntityId.prototype);
    id._value = value;
    return id;
  }

  get value(): number {
    return this._value;
  }

  private validate(): void {
    if (!Number.isInteger(this._value)) {
      throw new ValidationError('ID must be an integer');
    }
    if (this._value <= 0) {
      throw new ValidationError('ID must be greater than 0');
    }
  }

  equals(other: EntityId): boolean {
    return this._value === other._value;
  }
}
