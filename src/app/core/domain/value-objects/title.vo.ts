import { ValidationError } from '../errors';

export class Title {
  private constructor(private readonly _value: string) {
    this.validate();
  }

  static create(value: string): Title {
    return new Title(value);
  }

  static reconstitute(value: string): Title {
    const title = Object.create(Title.prototype);
    title._value = value;
    return title;
  }

  get value(): string {
    return this._value;
  }

  private validate(): void {
    const trimmed = this._value.trim();
    if (trimmed === '') {
      throw new ValidationError('Title cannot be empty');
    }
    if (trimmed.length > 255) {
      throw new ValidationError('Title cannot exceed 255 characters');
    }
  }

  equals(other: Title): boolean {
    return this._value === other._value;
  }
}
