import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:3000';
  private readonly http = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  createTask(title: string, description?: string): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, { title, description });
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/tasks/${task.id}`, {
      title: task.title,
      description: task.description,
    });
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${taskId}`);
  }
}
