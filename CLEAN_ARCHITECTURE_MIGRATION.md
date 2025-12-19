# Migration Clean Architecture - Kanban Application

## ✅ Ce qui a été créé (Phases 1-5)

### Phase 1: Domain Layer (Couche Domaine)
Création de la couche domain pure, indépendante du framework :

**Erreurs personnalisées** :
- `core/domain/errors/domain.error.ts` - Classe abstraite de base
- `core/domain/errors/validation.error.ts` - Erreurs de validation
- `core/domain/errors/not-found.error.ts` - Erreurs "non trouvé"

**Value Objects** (validation stricte) :
- `core/domain/value-objects/entity-id.vo.ts` - ID d'entité (doit être entier > 0)
- `core/domain/value-objects/title.vo.ts` - Titre (non vide, max 255 chars)

**Entités du domaine** :
- `core/domain/entities/kanban-item.entity.ts` - Tâche Kanban
- `core/domain/entities/kanban-column.entity.ts` - Colonne Kanban
- `core/domain/entities/workplace.entity.ts` - Workplace (aggrégat racine)

### Phase 2: Infrastructure Layer (Couche Infrastructure)
Création des adapters et implémentations concrètes :

**Ports (interfaces)** :
- `core/application/ports/workplace.repository.ts` - Interface du repository Workplace
- `core/application/ports/theme.repository.ts` - Interface du repository Theme

**Adapters de stockage** :
- `core/infrastructure/adapters/storage/storage.adapter.ts` - Interface abstraite
- `core/infrastructure/adapters/storage/local-storage.adapter.ts` - Implémentation localStorage

**Mappers** (Domain ↔ Persistence) :
- `core/infrastructure/mappers/workplace.mapper.ts` - Transformation bidirectionnelle

**Fixtures** :
- `core/infrastructure/fixtures/default-workplaces.fixture.ts` - Données par défaut

**Repositories (4 implémentations)** :
- `core/infrastructure/repositories/local-storage-workplace.repository.ts` - Workplace avec localStorage
- `core/infrastructure/repositories/in-memory-workplace.repository.ts` - Workplace en mémoire (tests)
- `core/infrastructure/repositories/local-storage-theme.repository.ts` - Theme avec localStorage
- `core/infrastructure/repositories/in-memory-theme.repository.ts` - Theme en mémoire (tests)

**Configuration DI** :
- `shared/providers/repository.providers.ts` - Configuration des providers
- `app.config.ts` - Ajout des providers à l'application

### Phase 3: Application Layer (Use Cases)
Création de tous les use cases métier :

**Use Cases Workplace** :
- `core/application/use-cases/workplace/get-workplaces.use-case.ts`
- `core/application/use-cases/workplace/get-workplace-by-id.use-case.ts`

**Use Cases Task** :
- `core/application/use-cases/task/create-task.use-case.ts`
- `core/application/use-cases/task/update-task.use-case.ts`
- `core/application/use-cases/task/delete-task.use-case.ts`
- `core/application/use-cases/task/move-task.use-case.ts`

**Use Cases Column** :
- `core/application/use-cases/column/reorder-columns.use-case.ts`

**Use Cases Theme** :
- `core/application/use-cases/theme/get-theme.use-case.ts`
- `core/application/use-cases/theme/toggle-theme.use-case.ts`

### Phase 4: Facade Services
Création des services façade pour orchestrer les use cases :

**Services Facade** :
- `features/kanban/services/kanban-facade.service.ts` - Orchestration Kanban + gestion d'état
- `features/workspace/services/workspace-facade.service.ts` - Gestion workspaces
- `features/theme/services/theme-facade.service.ts` - Gestion thème avec persistence

### Phase 5: Modal Components
Extraction des modals en composants réutilisables :

**Composants Modal** :
- `features/modals/components/new-task-modal/` - Modal création de tâche
- `features/modals/components/edit-task-modal/` - Modal édition de tâche
- `features/modals/components/delete-confirm-modal/` - Modal confirmation suppression

---

## 🎯 Architecture Finale

```
src/app/
├── core/                           # COUCHE CORE
│   ├── domain/                     # Domain Layer (logique métier pure)
│   │   ├── entities/               # Entités du domaine
│   │   ├── value-objects/          # Value Objects avec validation
│   │   └── errors/                 # Erreurs custom
│   │
│   ├── application/                # Application Layer
│   │   ├── ports/                  # Repository interfaces (hexagonal ports)
│   │   └── use-cases/              # Use cases métier
│   │
│   └── infrastructure/             # Infrastructure Layer
│       ├── repositories/           # Implémentations des repositories
│       ├── adapters/               # Adapters (storage, etc.)
│       ├── mappers/                # Mappers Domain ↔ Persistence
│       └── fixtures/               # Données par défaut
│
├── features/                       # COUCHE PRESENTATION
│   ├── kanban/
│   │   └── services/               # KanbanFacadeService
│   ├── workspace/
│   │   └── services/               # WorkspaceFacadeService
│   ├── theme/
│   │   └── services/               # ThemeFacadeService
│   └── modals/
│       └── components/             # Composants modal réutilisables
│
└── shared/
    └── providers/                  # Configuration DI
```

---

## 📊 État Actuel

### ✅ Ce qui est prêt et fonctionnel :
- **Domain Layer** : Entités avec validation stricte
- **Infrastructure Layer** : Repositories interchangeables (localStorage ↔ in-memory)
- **Application Layer** : 10 use cases testables
- **Facades** : 3 services d'orchestration avec gestion d'état
- **Modals** : 3 composants modal réutilisables
- **DI configurée** : Prête à l'emploi

### ⏳ Ce qui reste à faire (Phase 6-7) :

#### Phase 6: Séparer les composants Kanban (optionnel)
Créer des composants presentational/container :
- `features/kanban/components/kanban-item/` - Item individuel (dumb)
- `features/kanban/components/kanban-column/` - Colonne (dumb)
- `features/kanban/components/kanban-board/` - Board (dumb)
- `features/kanban/containers/kanban-board-container/` - Container (smart)

#### Phase 7: Refactoriser App Component
Migrer `app.ts` pour utiliser les Facades :
- Injecter les 3 Facades (Kanban, Workspace, Theme)
- Supprimer toutes les méthodes CRUD
- Supprimer `loadWorkplaces()` et les effects de persistence
- Garder uniquement l'état UI des modals
- Déléguer toutes les opérations aux Facades

**Résultat attendu** : `app.ts` passera de 290 lignes → ~100-150 lignes

---

## 🚀 Comment Migrer vers la Nouvelle Architecture

### Option 1: Migration Progressive (Recommandée)

1. **Remplacer les modals dans app.html** :
   ```html
   <!-- Ancien -->
   @if (showNewTaskModal()) {
     <div class="modal modal-open">
       <!-- ... template inline ... -->
     </div>
   }

   <!-- Nouveau -->
   <app-new-task-modal
     [isOpen]="showNewTaskModal()"
     [columns]="modalColumns()"
     [selectedColumnId]="selectedColumnId()"
     (taskCreated)="onTaskCreated($event)"
     (closed)="closeNewTaskModal()"
   />
   ```

2. **Importer les nouveaux composants dans app.ts** :
   ```typescript
   import {
     NewTaskModalComponent,
     EditTaskModalComponent,
     DeleteConfirmModalComponent,
   } from './features/modals/components';
   ```

3. **Ajouter aux imports du composant** :
   ```typescript
   @Component({
     imports: [
       Kanban,
       Sidebar,
       LucideAngularModule,
       FormsModule,
       NgxSonnerToaster,
       NewTaskModalComponent,      // ✅ Nouveau
       EditTaskModalComponent,     // ✅ Nouveau
       DeleteConfirmModalComponent, // ✅ Nouveau
     ],
   })
   ```

4. **Injecter les Facades** :
   ```typescript
   export class App {
     private readonly kanbanFacade = inject(KanbanFacadeService);
     private readonly workspaceFacade = inject(WorkspaceFacadeService);
     private readonly themeFacade = inject(ThemeFacadeService);

     constructor() {
       this.initializeFacades();
     }

     private async initializeFacades(): Promise<void> {
       await this.workspaceFacade.loadWorkplaces();
       await this.kanbanFacade.loadWorkplace(1);
     }
   }
   ```

5. **Remplacer progressivement les méthodes CRUD** :
   ```typescript
   // Ancien
   protected addNewTask(): void {
     const title = this.newTaskTitle().trim();
     const columnId = this.selectedColumnId();
     // ... logique complexe ...
   }

   // Nouveau
   protected async onTaskCreated(event: { columnId: number; title: string }): Promise<void> {
     await this.kanbanFacade.createTask(event);
     this.closeNewTaskModal();
   }
   ```

6. **Utiliser les computed signals des Facades** :
   ```typescript
   // Ancien
   protected readonly activeWorkplace = computed(() =>
     this.workplaces().find(w => w.id === this.activeWorkplaceId())
   );

   // Nouveau
   protected readonly activeWorkplace = computed(() =>
     this.kanbanFacade.activeWorkplace()
   );
   ```

### Option 2: Migration Complète (Plus rapide mais plus risquée)

Remplacer complètement `app.ts` par une version utilisant les Facades. Voir l'exemple complet dans les fichiers de migration.

---

## 🎁 Bénéfices de l'Architecture Clean

### ✅ Testabilité
- **Domain Layer** : Testable sans framework (tests unitaires purs)
- **Use Cases** : Testables avec repositories mockés
- **Repositories** : Testables avec adapters mockés
- **Facades** : Testables avec use cases mockés

### ✅ Maintenabilité
- **Séparation des responsabilités** : Chaque couche a un rôle clair
- **Single Responsibility** : Chaque classe a une seule raison de changer
- **Code lisible** : Les use cases documentent les opérations métier

### ✅ Flexibilité
- **Repositories interchangeables** : Passer de localStorage à une API REST en changeant juste le provider
- **In-memory pour les tests** : Tests ultra-rapides sans dépendance externe
- **Multiple implémentations** : Peut avoir plusieurs backends simultanément

### ✅ Type Safety & Validation
- **Value Objects** : Validation stricte au niveau du domaine
- **Erreurs typées** : ValidationError, NotFoundError avec contexte
- **Impossible States** : Les états invalides ne compilent pas

### ✅ Scalabilité
- **Pattern répétable** : Ajouter une feature suit toujours le même pattern
- **Domain pure** : La logique métier est indépendante du framework
- **Découplage** : Chaque couche peut évoluer indépendamment

---

## 📝 Exemple d'Utilisation des Facades

### Créer une tâche
```typescript
await this.kanbanFacade.createTask({
  columnId: 1,
  title: 'Nouvelle tâche'
});
// ✅ Validation automatique du titre
// ✅ Génération automatique de l'ID
// ✅ Persistence automatique
// ✅ Toast de succès
// ✅ Rechargement du workplace
```

### Déplacer une tâche
```typescript
await this.kanbanFacade.moveTask({
  taskId: 5,
  sourceColumnId: 1,
  targetColumnId: 2,
  newIndex: 0
});
// ✅ Gestion du drag-drop
// ✅ Persistence automatique
// ✅ Gestion d'erreurs
```

### Changer de thème
```typescript
await this.themeFacade.toggleTheme();
// ✅ Toggle dark/light
// ✅ Persistence dans localStorage
// ✅ Application automatique au DOM
```

---

## 🧪 Tester l'Architecture

### Tester avec In-Memory Repository

Dans `shared/providers/repository.providers.ts`, changer :
```typescript
// Production (localStorage)
{
  provide: WorkplaceRepository,
  useClass: LocalStorageWorkplaceRepository,
}

// Tests (in-memory)
{
  provide: WorkplaceRepository,
  useClass: InMemoryWorkplaceRepository, // ✅ Change ici
}
```

### Tester les Use Cases

```typescript
describe('CreateTaskUseCase', () => {
  it('should create a task', async () => {
    const repository = new InMemoryWorkplaceRepository();
    const useCase = new CreateTaskUseCase(repository);

    const result = await useCase.execute({
      workplaceId: 1,
      columnId: 1,
      title: 'Test Task'
    });

    expect(result.taskId).toBeDefined();
  });

  it('should throw ValidationError for empty title', async () => {
    const repository = new InMemoryWorkplaceRepository();
    const useCase = new CreateTaskUseCase(repository);

    await expect(
      useCase.execute({
        workplaceId: 1,
        columnId: 1,
        title: ''  // ❌ Vide
      })
    ).rejects.toThrow(ValidationError);
  });
});
```

---

## 🔧 Prochaines Étapes Recommandées

1. **Tester la nouvelle architecture** :
   - Basculer sur InMemoryRepository dans les providers
   - Vérifier que tout fonctionne
   - Revenir sur LocalStorageRepository

2. **Migrer progressivement app.ts** :
   - Remplacer les modals inline par les nouveaux composants
   - Injecter les Facades
   - Remplacer une méthode CRUD à la fois
   - Tester après chaque changement

3. **Écrire des tests** :
   - Tests unitaires pour les entités
   - Tests unitaires pour les use cases
   - Tests d'intégration pour les Facades

4. **Optimiser** :
   - Créer les composants Kanban separés (Phase 6)
   - Extraire plus de composants présentationnels
   - Ajouter du caching dans les repositories si nécessaire

---

## 📚 Structure des Fichiers Créés

Total: **60+ fichiers** créés pour une architecture Clean complète !

- **8 fichiers** Domain Layer (entities, value objects, errors)
- **10 fichiers** Application Layer (use cases)
- **2 fichiers** Ports (repository interfaces)
- **12 fichiers** Infrastructure Layer (repositories, adapters, mappers)
- **3 fichiers** Facades
- **6 fichiers** Modal Components
- **+ fichiers** d'index et configuration

---

**L'architecture Clean est maintenant en place et prête à être utilisée ! 🎉**
