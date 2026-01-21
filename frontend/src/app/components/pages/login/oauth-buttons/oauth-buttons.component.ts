import { Component, inject, output } from '@angular/core';
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
  public oauthError: string | null = null;

  public loadingChange = output<boolean>();
  public errorChange = output<string | null>();

  private readonly supabaseService = inject(SupabaseService);

  public async loginWithOAuth(provider: OAuthProvider) {
    this.isOAuthLoading = true;
    this.oauthError = null;
    this.loadingChange.emit(true);
    this.errorChange.emit(null);

    try {
      await this.supabaseService.signInWithOAuth(provider);
    } catch (error: any) {
      console.error('OAuth login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'שגיאה בהתחברות. אנא נסה שוב.';
      this.oauthError = errorMessage;
      this.isOAuthLoading = false;
      this.loadingChange.emit(false);
      this.errorChange.emit(errorMessage);
    }
  }

  public loginWithGoogle() {
    this.loginWithOAuth('google');
  }
}
