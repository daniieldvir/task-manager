import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthActions } from '../../../state/auth/auth.action';
import { ButtonComponent } from '../../shared/button/button.component';
import { OauthButtonsComponent } from './oauth-buttons/oauth-buttons.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, OauthButtonsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  public isOAuthLoading = false;
  public oauthError: string | null = null;

  private readonly store = inject(Store);

  public login() {
    const { email, password } = this.loginForm.getRawValue();

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    if (!email || !password) {
      return;
    }

    this.store.dispatch(new AuthActions.LoginUser({ email, password }));
  }
}
