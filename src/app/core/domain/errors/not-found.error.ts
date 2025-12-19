import { DomainError } from './domain.error';

export class NotFoundError extends DomainError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 'NOT_FOUND_ERROR', context);
  }
}
