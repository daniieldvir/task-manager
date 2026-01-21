import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private readonly prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // Signal to track current theme
  public readonly currentTheme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Apply theme on initialization
    this.applyTheme(this.currentTheme());

    // Listen for system theme changes
    this.prefersDarkQuery.addEventListener('change', (e) => {
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
    // Check localStorage first
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    // Fall back to system preference
    return this.prefersDarkQuery.matches ? 'dark' : 'light';
  }

  public setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  public toggleTheme(): void {
    const newTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  private applyTheme(theme: Theme): void {
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
