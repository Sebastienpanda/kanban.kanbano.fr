import { DomainError } from './domain.error';

export class ValidationError extends DomainError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 'VALIDATION_ERROR', context);
  }
}
