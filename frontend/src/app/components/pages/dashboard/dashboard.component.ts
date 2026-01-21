import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TasksSelectors } from '../../../state/tasks/tasks.selectors';

import { select, Store } from '@ngxs/store';
import { Task, TaskFormData } from '../../../models/task.models';
import { AuthActions } from '../../../state/auth/auth.action';
import { AuthSelectors } from '../../../state/auth/auth.selectors';
import { TasksActions } from '../../../state/tasks/tasks.action';
import { ThemeToggleComponent } from '../../shard/theme-toggle/theme-toggle.component';
import { TasksComponent } from './tasks/tasks.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TasksComponent, ThemeToggleComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly store = inject(Store);

  protected readonly loggedInUser = select(AuthSelectors.slices.loggedInUser);
  protected readonly tasks = select(TasksSelectors.slices.tasks);
  protected readonly loading = select(TasksSelectors.slices.loading);
  protected readonly error = select(TasksSelectors.slices.error);

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
}
