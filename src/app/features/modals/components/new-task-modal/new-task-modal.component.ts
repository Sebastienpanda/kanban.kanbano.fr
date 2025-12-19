import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, X } from 'lucide-angular';

export interface Column {
  id: number;
  title: string;
}

@Component({
  selector: 'app-new-task-modal',
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './new-task-modal.component.html',
})
export class NewTaskModalComponent {
  // Inputs
  readonly isOpen = input.required<boolean>();
  readonly columns = input.required<Column[]>();
  readonly selectedColumnId = input.required<number | null>();

  // Outputs
  readonly taskCreated = output<{ columnId: number; title: string }>();
  readonly closed = output<void>();

  // Local state
  protected readonly taskTitle = signal('');
  protected readonly currentColumnId = signal<number | null>(null);
  protected readonly PlusIcon = Plus;
  protected readonly XIcon = X;

  constructor() {
    // Sync currentColumnId with selectedColumnId when modal opens
    effect(() => {
      if (this.isOpen()) {
        this.currentColumnId.set(this.selectedColumnId());
      }
    });
  }

  protected onSubmit(): void {
    const title = this.taskTitle().trim();
    const columnId = this.currentColumnId();

    if (!title || columnId === null) return;

    this.taskCreated.emit({ columnId, title });
    this.taskTitle.set('');
  }

  protected onClose(): void {
    this.taskTitle.set('');
    this.closed.emit();
  }

  protected onKeyEnter(): void {
    this.onSubmit();
  }
}
