import { Component, effect, input, output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LucideAngularModule, Plus, X } from "lucide-angular";

export interface TaskToEdit {
	id: number;
	title: string;
	columnId: number;
}

@Component({
	selector: "app-edit-task-modal",
	imports: [FormsModule, LucideAngularModule],
	templateUrl: "./edit-task-modal.component.html",
})
export class EditTaskModalComponent {
	// Inputs
	readonly isOpen = input.required<boolean>();
	readonly task = input<TaskToEdit | null>(null);

	// Outputs
	readonly taskUpdated = output<{
		taskId: number;
		columnId: number;
		title: string;
	}>();
	readonly closed = output<void>();

	// Local state
	protected readonly taskTitle = signal("");
	protected readonly PlusIcon = Plus;
	protected readonly XIcon = X;

	constructor() {
		// Sync taskTitle with task input
		effect(() => {
			const currentTask = this.task();
			if (currentTask) {
				this.taskTitle.set(currentTask.title);
			}
		});
	}

	protected onSubmit(): void {
		const title = this.taskTitle().trim();
		const currentTask = this.task();

		if (!title || !currentTask) return;

		this.taskUpdated.emit({
			taskId: currentTask.id,
			columnId: currentTask.columnId,
			title,
		});
		this.taskTitle.set("");
	}

	protected onClose(): void {
		this.taskTitle.set("");
		this.closed.emit();
	}

	protected onKeyEnter(): void {
		this.onSubmit();
	}
}
