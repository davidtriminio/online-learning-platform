import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ThemeService } from './infrastructure/theme/theme.service'
import { LoadingOverlay } from './shared/ui/loading-overlay/loading-overlay'
import { ThemeToggle } from './shared/ui/theme-toggle/theme-toggle'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingOverlay, ThemeToggle],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly themeService = inject(ThemeService)
}
