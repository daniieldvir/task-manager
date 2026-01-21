import { Task, TaskFormData } from '../../models/task.models';

export namespace TasksActions {
  export class GetTasks {
    static readonly type = '[Tasks] Get Tasks';
    constructor(public readonly page: number = 0, public readonly pageSize: number = 3) { }
  }

  export class CreateTask {
    static readonly type = '[Tasks] Create Task';
    constructor(public readonly task: { title: string; description: string }) { }
  }

  export class UpdateTask {
    static readonly type = '[Tasks] Update Task';
    constructor(public readonly task: TaskFormData) { }
  }

  export class DeleteTask {
    static readonly type = '[Tasks] Delete Task';
    constructor(public readonly task: Task) { }
  }
}
