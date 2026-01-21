import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskFormData } from '../models/task.models';
import { environment } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = environment.apiUrl + '/tasks';
  private readonly http = inject(HttpClient);

  getTasks(page: number = 0, pageSize: number = 20): Observable<{ tasks: Task[], count: number }> {
    return this.http.get<{ tasks: Task[], count: number }>(`${this.baseUrl}`, {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    });
  }

  createTask(title: string, description?: string): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}`, { title, description });
  }

  updateTask(taskData: TaskFormData): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${taskData.id}`, {
      title: taskData.title,
      description: taskData.description,
    });
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${taskId}`);
  }
}
