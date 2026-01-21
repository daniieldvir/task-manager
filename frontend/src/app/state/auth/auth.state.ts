import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, State, StateContext } from '@ngxs/store';
import { catchError, of, tap } from 'rxjs';
import { AuthResponse } from '../../models/auth-response.models';
import { AuthService } from '../../service/auth.service';
import { AuthActions } from './auth.action';
import { TasksActions } from '../tasks/tasks.action';

export interface AuthStateModel {
  loggedInUser: { id: number; email: string } | null;
  loading: boolean;
}

@Injectable()
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loggedInUser: null,
    loading: false,
  },
})
export class AuthState {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  @Action(AuthActions.BootstrapAuth)
  bootstrapAuth(ctx: StateContext<AuthStateModel>) {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      const user = JSON.parse(userStr);

      ctx.patchState({
        loggedInUser: user,
        loading: false,
      });

      ctx.dispatch(new TasksActions.GetTasks());
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }


  @Action(AuthActions.LoginUser)
  loginUser(ctx: StateContext<AuthStateModel>, action: AuthActions.LoginUser) {
    ctx.patchState({ loading: true });

    return this.authService
      .login(action.loginData.email, action.loginData.password)
      .pipe(
        tap((response: AuthResponse) => {
          if (response.user && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            ctx.patchState({
              loggedInUser: response.user,
              loading: false,
            });

            ctx.dispatch(new TasksActions.GetTasks());

            this.router.navigate(['/dashboard']);
          }
        }),
        catchError((error) => {
          ctx.patchState({ loading: false });
          console.error('Login error:', error);
          return of(null);
        })
      );
  }
}
