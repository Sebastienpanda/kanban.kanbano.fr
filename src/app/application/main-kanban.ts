import {
    CdkDrag,
    type CdkDragDrop,
    CdkDropList,
    CdkDropListGroup,
    moveItemInArray,
    transferArrayItem,
} from "@angular/cdk/drag-drop";
import { CdkScrollable } from "@angular/cdk/overlay";
import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import type { Item } from "@domain/models/kanban-item.model";
import { KanbanColumnsUseCase } from "@domain/use-cases/kanban-columns.use-case";
import { GET_COLUMNS_GATEWAY } from "./tokens";

@Component({
    selector: "app-main-kanban",
    templateUrl: "./main-kanban.html",
    styleUrl: "./main-kanban.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CdkDropList, CdkDropListGroup, CdkDrag, CdkScrollable],
})
export class MainKanban {
    readonly isAsideOpen = input.required<boolean>();

    private readonly useCase = new KanbanColumnsUseCase(inject(GET_COLUMNS_GATEWAY));

    protected readonly columns = toSignal(this.useCase.all(), {
        initialValue: [],
    });

    drop(event: CdkDragDrop<Item[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }
}
