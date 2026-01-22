import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Provider } from '@supabase/supabase-js';

export type OAuthProvider = 'google' | 'facebook' | 'github' | 'azure';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://wegvdwwopduhlqprvjqe.supabase.co',
      'sb_publishable_AitW_pKFucHTQ7ZtQm6z8w_q_CSQA_B'
    );
  }

  async signInWithOAuth(provider: OAuthProvider) {
    const providerMap: Record<OAuthProvider, Provider> = {
      google: 'google',
      facebook: 'facebook',
      github: 'github',
      azure: 'azure',
    };

    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: providerMap[provider],
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw error;
    }

    // If data contains a URL, redirect to it manually
    if (data?.url) {
      window.location.href = data.url;
    }

    return data;
  }

  async getSession() {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) {
      throw error;
    }
    return data.session;
  }
}
