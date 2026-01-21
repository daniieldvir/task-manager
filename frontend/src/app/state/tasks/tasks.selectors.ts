import { createPropertySelectors, createSelector } from '@ngxs/store';
import { TasksState, TasksStateModel } from './tasks.state';

export class TasksSelectors {
  static slices = createPropertySelectors<TasksStateModel>(TasksState);
}
