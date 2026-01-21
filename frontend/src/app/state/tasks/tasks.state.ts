import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { catchError, of, tap } from 'rxjs';
import { TasksActions } from './tasks.action';
import { Task } from '../../models/task.models';
import { TaskService } from '../../service/task.service';

export interface TasksStateModel {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  lastPageReached: boolean;
}

@Injectable()
@State<TasksStateModel>({
  name: 'tasks',
  defaults: {
    tasks: [],
    loading: false,
    error: null,
    totalCount: 0,
    lastPageReached: false,
  },
})
export class TasksState {
  private readonly taskService = inject(TaskService);

  @Action(TasksActions.GetTasks)
  getTasks(ctx: StateContext<TasksStateModel>, action: TasksActions.GetTasks) {
    ctx.patchState({ loading: true });

    return this.taskService.getTasks(action.page, action.pageSize).pipe(
      tap(({ tasks, count }) => {
        ctx.patchState({
          tasks: tasks,
          totalCount: count || 0,
          lastPageReached: tasks.length < action.pageSize,
          loading: false,
          error: null,
        });
      }),
      catchError((error) => {
        ctx.patchState({ loading: false, error: error.message });
        return of({ tasks: [], count: 0 });
      })
    );
  }

  @Action(TasksActions.CreateTask)
  createTask(ctx: StateContext<TasksStateModel>, action: TasksActions.CreateTask) {
    ctx.patchState({ loading: true });

    return this.taskService.createTask(action.task.title, action.task.description).pipe(
      tap(() => {
        ctx.patchState({ error: null });
        return ctx.dispatch(new TasksActions.GetTasks(0, 3));
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
      tap(() => {
        ctx.patchState({ error: null });
        return ctx.dispatch(new TasksActions.GetTasks(0, 3));
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
        ctx.patchState({ error: null });
        return ctx.dispatch(new TasksActions.GetTasks(0, 3));
      }),
      catchError((error) => {
        ctx.patchState({ loading: false, error: error.message });
        return of(null);
      })
    );
  }
}
