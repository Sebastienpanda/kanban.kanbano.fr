import { Component, input, output } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-delete-confirm-modal',
  imports: [LucideAngularModule],
  templateUrl: './delete-confirm-modal.component.html',
})
export class DeleteConfirmModalComponent {
  // Inputs
  readonly isOpen = input.required<boolean>();
  readonly taskTitle = input<string>('');

  // Outputs
  readonly confirmed = output<void>();
  readonly cancelled = output<void>();

  protected readonly XIcon = X;

  protected onConfirm(): void {
    this.confirmed.emit();
  }

  protected onCancel(): void {
    this.cancelled.emit();
  }
}
