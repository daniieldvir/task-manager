import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SupabaseService } from '../../../../service/supabase.service';
import { AuthActions } from '../../../../state/auth/auth.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss'
})
export class AuthCallbackComponent implements OnInit {
  message = 'Verifying connection...';

  private readonly supabaseService = inject(SupabaseService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  async ngOnInit() {
    try {
      const session = await this.supabaseService.getSession();

      if (session) {
        // Store the session data
        localStorage.setItem('token', session.access_token);
        localStorage.setItem('user', JSON.stringify({
          id: session.user.id,
          email: session.user.email
        }));

        this.message = 'Login successful! Moving to dashboard...';

        // Dispatch OAuth login success action
        this.store.dispatch(new AuthActions.OAuthLoginSuccess({
          user: { id: session.user.id, email: session.user.email! },
          token: session.access_token
        }));

        // Navigate to dashboard
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 500);
      } else {
        this.message = 'No active session found.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }
    } catch (error) {
      console.error('OAuth callback error:', error);
      this.message = 'Login error. Trying again...';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
  }
}
