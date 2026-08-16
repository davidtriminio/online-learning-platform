import { DOCUMENT, effect, inject, Injectable, Service, signal } from '@angular/core';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'app-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private doc = inject(DOCUMENT);
  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const isDark = this.theme() === 'dark';
      this.doc.documentElement.classList.toggle('dark', isDark);
      localStorage.setItem(STORAGE_KEY, this.theme());
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  private getInitialTheme(): Theme {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved) return saved;

    const win = this.doc.defaultView;
    if (win?.matchMedia) {
      return win.matchMedia('prefers-color-scheme').matches ? 'dark' : 'light';
    }
    return 'light';
  }
}
