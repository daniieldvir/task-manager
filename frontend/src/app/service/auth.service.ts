import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.models';

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl + '/auth';

  private readonly http = inject(HttpClient);

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { email, password });
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, {});
  }

}
