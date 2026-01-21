import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, State, StateContext } from '@ngxs/store';
import { catchError, filter, of, tap } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { TasksActions } from './tasks.action';
import { Task } from '../../models/task.models';
import { TaskService } from '../../service/task.service';

export interface TasksStateModel {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

@Injectable()
@State<TasksStateModel>({
  name: 'tasks',
  defaults: {
    tasks: [],
    loading: false,
    error: null,
  },
})
export class TasksState {
  private readonly taskService = inject(TaskService);

  @Action(TasksActions.GetTasks)
  getTasks(ctx: StateContext<TasksStateModel>, action: TasksActions.GetTasks) {
    ctx.patchState({ loading: true });

    return this.taskService.getTasks().pipe(
      tap((tasks) => {
        console.log('Tasks loaded:', tasks);
        ctx.patchState({ tasks: tasks, loading: false, error: null });
      }),
      catchError((error) => {
        ctx.patchState({ loading: false, error: error.message });
        return of([] as Task[]);
      })
    );
  }

  @Action(TasksActions.CreateTask)
  createTask(ctx: StateContext<TasksStateModel>, action: TasksActions.CreateTask) {
    ctx.patchState({ loading: true });

    return this.taskService.createTask(action.task.title, action.task.description).pipe(
      tap((newTask) => {
        const currentTasks = ctx.getState().tasks;
        ctx.patchState({
          tasks: [...currentTasks, newTask],
          loading: false,
          error: null
        });
      }),
      catchError((error) => {
        ctx.patchState({ loading: false, error: error.message });
        return of(null);
      })
    );
  }

  @Action(TasksActions.UpdateTask)
  updateTask(ctx: StateContext<TasksStateModel>, action: TasksActions.UpdateTask) {
    ctx.patchState({ loading: true });

    return this.taskService.updateTask(action.task).pipe(
      tap((updatedTask) => {
        const currentTasks = ctx.getState().tasks;
        const updatedTasks = currentTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        ctx.patchState({
          tasks: updatedTasks,
          loading: false,
          error: null,
        });
      }),
      catchError((error) => {
        ctx.patchState({ loading: false, error: error.message });
        return of(null);
      })
    );
  }

  @Action(TasksActions.DeleteTask)
  deleteTask(ctx: StateContext<TasksStateModel>, action: TasksActions.DeleteTask) {
    ctx.patchState({ loading: true });

    return this.taskService.deleteTask(action.task.id).pipe(
      tap(() => {
        const currentTasks = ctx.getState().tasks;
        const updatedTasks = currentTasks.filter((task) => task.id !== action.task.id);
        ctx.patchState({ tasks: updatedTasks, loading: false, error: null });
      }),
      catchError((error) => {
        ctx.patchState({ loading: false, error: error.message });
        return of(null);
      })
    );
  }
}
