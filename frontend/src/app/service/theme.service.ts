import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // Signal to track current theme
  public readonly currentTheme = signal<Theme>(this.getInitialTheme());

  constructor() {
    if (!this.isBrowser) {
      return; // Skip DOM operations on server
    }

    // Apply theme on initialization
    this.applyTheme(this.currentTheme());

    // Listen for system theme changes
    const prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDarkQuery.addEventListener('change', (e) => {
      const savedTheme = localStorage.getItem(this.THEME_KEY);
      if (!savedTheme) {
        // Only auto-switch if user hasn't manually set a preference
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });

    // Effect to apply theme when it changes
    effect(() => {
      this.applyTheme(this.currentTheme());
    });
  }

  private getInitialTheme(): Theme {
    if (!this.isBrowser) {
      return 'light'; // Default for SSR
    }

    // Check localStorage first
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  public setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    if (this.isBrowser) {
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  public toggleTheme(): void {
    const newTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  private applyTheme(theme: Theme): void {
    if (!this.isBrowser) {
      return; // Skip DOM operations on server
    }

    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    // Also set class for additional styling flexibility
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }
}
