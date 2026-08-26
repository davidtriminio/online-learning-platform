import { computed, DOCUMENT, effect, inject, Injectable, signal } from '@angular/core'

type Theme = 'light' | 'dark' | 'system'
const STORAGE_KEY = 'app-theme'

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private doc = inject(DOCUMENT)
  private media = this.doc.defaultView?.matchMedia('(prefers-color-scheme: dark)')

  readonly theme = signal<Theme>(this.getInitialTheme())
  private readonly systemDark = signal(this.media?.matches ?? false)

  readonly isDark = computed(() =>
    this.theme() === 'system' ? this.systemDark() : this.theme() === 'dark',
  )

  constructor() {
    this.media?.addEventListener('change', (e) => this.systemDark.set(e.matches))

    effect(() => {
      this.doc.documentElement.classList.toggle('dark', this.isDark())
      localStorage.setItem(STORAGE_KEY, this.theme())
    })
  }

  set(theme: Theme): void {
    this.theme.set(theme)
  }

  cycle(): void {
    this.theme.update((t) => (t === 'light' ? 'dark' : t === 'dark' ? 'system' : 'light'))
  }

  private getInitialTheme(): Theme {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    return saved ?? 'system'
  }
}
