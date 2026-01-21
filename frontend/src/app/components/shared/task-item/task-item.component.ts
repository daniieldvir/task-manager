import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.models';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  task = input.required<Task>();
  needsActions = input.required<boolean>();

  edit = output<Task>();
  delete = output<Task>();

  onEdit() {
    this.edit.emit(this.task());
  }

  onDelete() {
    this.delete.emit(this.task());
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
