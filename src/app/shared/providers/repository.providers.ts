import { Provider } from '@angular/core';
import { WorkplaceRepository, ThemeRepository } from '../../core/application/ports';
import {
  LocalStorageWorkplaceRepository,
  LocalStorageThemeRepository,
} from '../../core/infrastructure/repositories';
import { StorageAdapter } from '../../core/infrastructure/adapters/storage';
import { LocalStorageAdapter } from '../../core/infrastructure/adapters/storage';

export const REPOSITORY_PROVIDERS: Provider[] = [
  // Storage adapter
  {
    provide: StorageAdapter,
    useClass: LocalStorageAdapter,
  },

  // Workplace repository
  {
    provide: WorkplaceRepository,
    useClass: LocalStorageWorkplaceRepository,
    // For testing, switch to: useClass: InMemoryWorkplaceRepository,
  },

  // Theme repository
  {
    provide: ThemeRepository,
    useClass: LocalStorageThemeRepository,
  },
];
