import { Injectable, inject, signal } from '@angular/core';
import {
  CreateTaskUseCase,
  UpdateTaskUseCase,
  DeleteTaskUseCase,
  MoveTaskUseCase,
  ReorderColumnsUseCase,
  GetWorkplaceByIdUseCase,
} from '../../../core/application/use-cases';
import { WorkplaceEntity } from '../../../core/domain/entities';
import { toast } from 'ngx-sonner';
import { ValidationError, NotFoundError } from '../../../core/domain/errors';

@Injectable({ providedIn: 'root' })
export class KanbanFacadeService {
  private readonly createTaskUseCase = inject(CreateTaskUseCase);
  private readonly updateTaskUseCase = inject(UpdateTaskUseCase);
  private readonly deleteTaskUseCase = inject(DeleteTaskUseCase);
  private readonly moveTaskUseCase = inject(MoveTaskUseCase);
  private readonly reorderColumnsUseCase = inject(ReorderColumnsUseCase);
  private readonly getWorkplaceByIdUseCase = inject(GetWorkplaceByIdUseCase);

  // State
  readonly activeWorkplaceId = signal<number>(1);
  readonly activeWorkplace = signal<WorkplaceEntity | null>(null);
  readonly isLoading = signal<boolean>(false);

  async loadWorkplace(workplaceId: number): Promise<void> {
    try {
      this.isLoading.set(true);
      const workplace = await this.getWorkplaceByIdUseCase.execute({ workplaceId });
      this.activeWorkplace.set(workplace);
      this.activeWorkplaceId.set(workplaceId);
    } catch (error) {
      this.handleError(error, 'Erreur lors du chargement du workspace');
    } finally {
      this.isLoading.set(false);
    }
  }

  async createTask(params: { columnId: number; title: string }): Promise<void> {
    this.isLoading.set(true);
    try {
      await this.createTaskUseCase.execute({
        workplaceId: this.activeWorkplaceId(),
        columnId: params.columnId,
        title: params.title,
      });

      // Reload workplace to get updated data
      await this.loadWorkplace(this.activeWorkplaceId());

      toast.success('Tâche créée avec succès', {
        description: params.title,
      });
    } catch (error) {
      this.handleError(error, 'Erreur lors de la création de la tâche');
    } finally {
      this.isLoading.set(false);
    }
  }

  async updateTask(params: {
    taskId: number;
    columnId: number;
    title: string;
  }): Promise<void> {
    this.isLoading.set(true);
    try {
      await this.updateTaskUseCase.execute({
        workplaceId: this.activeWorkplaceId(),
        columnId: params.columnId,
        taskId: params.taskId,
        title: params.title,
      });

      // Reload workplace to get updated data
      await this.loadWorkplace(this.activeWorkplaceId());

      toast.success('Tâche modifiée avec succès', {
        description: params.title,
      });
    } catch (error) {
      this.handleError(error, 'Erreur lors de la modification de la tâche');
    } finally {
      this.isLoading.set(false);
    }
  }

  async deleteTask(params: { taskId: number; columnId: number }): Promise<void> {
    this.isLoading.set(true);
    try {
      await this.deleteTaskUseCase.execute({
        workplaceId: this.activeWorkplaceId(),
        columnId: params.columnId,
        taskId: params.taskId,
      });

      // Reload workplace to get updated data
      await this.loadWorkplace(this.activeWorkplaceId());

      toast.success('Tâche supprimée');
    } catch (error) {
      this.handleError(error, 'Erreur lors de la suppression de la tâche');
    } finally {
      this.isLoading.set(false);
    }
  }

  async moveTask(params: {
    taskId: number;
    sourceColumnId: number;
    targetColumnId: number;
    newIndex: number;
  }): Promise<void> {
    try {
      await this.moveTaskUseCase.execute({
        workplaceId: this.activeWorkplaceId(),
        ...params,
      });

      // Reload workplace to get updated data
      await this.loadWorkplace(this.activeWorkplaceId());
    } catch (error) {
      this.handleError(error, 'Erreur lors du déplacement de la tâche');
    }
  }

  async reorderColumns(params: {
    previousIndex: number;
    currentIndex: number;
  }): Promise<void> {
    try {
      await this.reorderColumnsUseCase.execute({
        workplaceId: this.activeWorkplaceId(),
        ...params,
      });

      // Reload workplace to get updated data
      await this.loadWorkplace(this.activeWorkplaceId());
    } catch (error) {
      this.handleError(error, 'Erreur lors du réordonnancement des colonnes');
    }
  }

  private handleError(error: unknown, defaultMessage: string): void {
    if (error instanceof ValidationError) {
      toast.error('Erreur de validation', {
        description: error.message,
      });
    } else if (error instanceof NotFoundError) {
      toast.error('Élément non trouvé', {
        description: error.message,
      });
    } else {
      toast.error(defaultMessage);
      console.error(error);
    }
  }
}
