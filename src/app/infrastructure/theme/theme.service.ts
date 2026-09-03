import {
  afterNextRender,
  computed,
  DOCUMENT,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

type Theme = 'light' | 'dark' | 'system'
const STORAGE_KEY = 'app-theme'

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private doc = inject(DOCUMENT)
  private platformId = inject(PLATFORM_ID)
  private isBrowser = isPlatformBrowser(this.platformId)

  private media = this.isBrowser
    ? this.doc.defaultView?.matchMedia('(preferes-color-scheme: dark)')
    : null

  readonly theme = signal<Theme>('system')
  private readonly systemDark = signal(this.media?.matches ?? false)

  readonly isDark = computed(() =>
    this.theme() === 'system' ? this.systemDark() : this.theme() === 'dark',
  )

  constructor() {
    this.media?.addEventListener('change', (e) => this.systemDark.set(e.matches))

    afterNextRender(() => {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (saved) this.theme.set(saved)
    })

    effect(() => {
      const dark = this.isDark()
      this.doc.documentElement.classList.toggle('dark', this.isDark())
      if (this.isBrowser) localStorage.setItem(STORAGE_KEY, this.theme())
    })
  }

  set(theme: Theme): void {
    this.theme.set(theme)
  }

  cycle(): void {
    this.theme.update((t) => (t === 'light' ? 'dark' : t === 'dark' ? 'system' : 'light'))
  }
}
