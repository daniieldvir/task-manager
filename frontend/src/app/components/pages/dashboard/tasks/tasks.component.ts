import { Component, signal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../../../shard/task-item/task-item.component';
import { ButtonComponent } from '../../../shard/button/button.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { DeleteConfirmationComponent } from '../../../shard/delete-confirmation/delete-confirmation.component';
import { Task, TaskFormData } from '../../../../models/task.models';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, ButtonComponent, TaskFormComponent, DeleteConfirmationComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  // Inputs
  public tasks = input<Task[]>([]);
  public loading = input<boolean>(false);
  public error = input<string | null>(null);

  // Outputs
  public taskCreated = output<TaskFormData>();
  public taskUpdated = output<Task>();
  public taskDeleted = output<Task>();

  // Internal state
  public isOpen = signal<boolean>(false);
  public formTitle = signal<string>('');
  public currentTask = signal<Task | null>(null);
  public isDeleteOpen = signal<boolean>(false);
  public taskToDelete = signal<Task | null>(null);


  public addTask() {
    this.currentTask.set(null);
    this.isOpen.set(true);
    this.formTitle.set('Add Task');
  }

  public close() {
    this.isOpen.set(false);
    this.currentTask.set(null);
  }

  public handleFormConfirmed(taskData: TaskFormData) {
    if (taskData.id) {
      // Update existing task
      const task: Task = {
        id: taskData.id,
        title: taskData.title,
        description: taskData.description,
        user_id: this.currentTask()!.user_id,
        created_at: this.currentTask()!.created_at,
      };
      this.taskUpdated.emit(task);
    } else {
      // Create new task
      this.taskCreated.emit(taskData);
    }
    this.isOpen.set(false);
    this.currentTask.set(null);
  }

  public editTask(task: Task) {
    this.currentTask.set(task);
    this.isOpen.set(true);
    this.formTitle.set('Edit Task');
  }

  public deleteTask(task: Task) {
    this.taskToDelete.set(task);
    this.isDeleteOpen.set(true);
  }

  public confirmDelete() {
    const task = this.taskToDelete();
    if (task) {
      this.taskDeleted.emit(task);
    }
    this.isDeleteOpen.set(false);
    this.taskToDelete.set(null);
  }

  public closeDeletePopup() {
    this.isDeleteOpen.set(false);
    this.taskToDelete.set(null);
  }

}
