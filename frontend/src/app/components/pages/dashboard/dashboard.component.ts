import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TasksSelectors } from '../../../state/tasks/tasks.selectors';
import { select, Store } from '@ngxs/store';
import { Task, TaskFormData } from '../../../models/task.models';
import { AuthActions } from '../../../state/auth/auth.action';
import { AuthSelectors } from '../../../state/auth/auth.selectors';
import { TasksActions } from '../../../state/tasks/tasks.action';

import { TaskFormComponent } from './task-form/task-form.component';
import { ThemeToggleComponent } from '../../shard/theme-toggle/theme-toggle.component';
import { ButtonComponent } from '../../shard/button/button.component';
import { TaskItemComponent } from '../../shard/task-item/task-item.component';
import { DeleteConfirmationComponent } from '../../shard/delete-confirmation/delete-confirmation.component';
import { PlaceholderCardComponent } from '../../shard/placeholder-card/placeholder-card.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ThemeToggleComponent,
    ButtonComponent,
    TaskItemComponent,
    TaskFormComponent,
    DeleteConfirmationComponent,
    PlaceholderCardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly store = inject(Store);

  protected readonly loggedInUser = select(AuthSelectors.slices.loggedInUser);
  protected readonly tasks = select(TasksSelectors.slices.tasks);
  protected readonly loading = select(TasksSelectors.slices.loading);
  protected readonly error = select(TasksSelectors.slices.error);

  public isOpen = signal<boolean>(false);
  public formTitle = signal<string>('');
  public currentTask = signal<Task | null>(null);
  public isDeleteOpen = signal<boolean>(false);
  public taskToDelete = signal<Task | null>(null);

  constructor() {
    this.store.dispatch(new AuthActions.BootstrapAuth());
  }

  onTaskCreated(taskData: TaskFormData) {
    this.store.dispatch(new TasksActions.CreateTask(taskData));
  }

  onTaskUpdated(task: Task) {
    this.store.dispatch(new TasksActions.UpdateTask(task));
  }

  onTaskDeleted(task: Task) {
    this.store.dispatch(new TasksActions.DeleteTask(task));
  }

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
      // Update existing task - safely get current task first
      const current = this.currentTask();

      if (!current) {
        console.error('Cannot update task: currentTask is null');
        return;
      }

      const task: Task = {
        id: taskData.id,
        title: taskData.title,
        description: taskData.description,
        user_id: current.user_id,
        created_at: current.created_at,
      };
      this.onTaskUpdated(task);
    } else {
      // Create new task
      this.onTaskCreated(taskData);
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
      this.onTaskDeleted(task);
    }
    this.isDeleteOpen.set(false);
    this.taskToDelete.set(null);
  }

  public closeDeletePopup() {
    this.isDeleteOpen.set(false);
    this.taskToDelete.set(null);
  }
}
