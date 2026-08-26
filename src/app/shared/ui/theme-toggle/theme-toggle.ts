import { Component, inject } from '@angular/core'
import { ThemeService } from '../../../infrastructure/theme/theme.service'
import { Button } from '../button/button/button'
import { LucideMonitor, LucideMoon, LucideSun } from '@lucide/angular'

@Component({
  selector: 'app-theme-toggle',
  imports: [Button, LucideSun, LucideMoon, LucideMonitor],
  templateUrl: './theme-toggle.html',
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService)
}
