import { Component, inject } from '@angular/core';
import { SupabaseService, OAuthProvider } from '../../../../service/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-oauth-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oauth-buttons.component.html',
  styleUrl: './oauth-buttons.component.scss',
})
export class OauthButtonsComponent {
  public isOAuthLoading = false;

  private readonly supabaseService = inject(SupabaseService);

  public async loginWithOAuth(provider: OAuthProvider) {
    this.isOAuthLoading = true;

    try {
      await this.supabaseService.signInWithOAuth(provider);
    } catch (error: any) {
      console.error('OAuth login error:', error);
      this.isOAuthLoading = false;
    }
  }

  public loginWithGoogle() {
    this.loginWithOAuth('google');
  }
}
