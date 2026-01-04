import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'portfolio_theme';

  private readonly _isDark$ = new BehaviorSubject<boolean>(false);
  readonly isDark$ = this._isDark$.asObservable();

  /** Call once on app start (e.g., in LayoutComponent constructor). */
  init(): void {
    if (!this.canUseDom()) return;

    const saved = localStorage.getItem(this.storageKey) as ThemeMode | null;

    if (saved === 'dark') {
      this.setDark(true);
      return;
    }

    if (saved === 'light') {
      this.setDark(false);
      return;
    }

    // No saved preference -> follow OS preference
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.setDark(prefersDark);
  }

  toggle(): void {
    this.setDark(!this._isDark$.value);
  }

  setDark(isDark: boolean): void {
    this._isDark$.next(isDark);

    if (!this.canUseDom()) return;

    const root = document.documentElement;

    if (isDark) {
      root.classList.add('theme-dark');
      localStorage.setItem(this.storageKey, 'dark');
    } else {
      root.classList.remove('theme-dark');
      localStorage.setItem(this.storageKey, 'light');
    }
  }

  private canUseDom(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }
}
