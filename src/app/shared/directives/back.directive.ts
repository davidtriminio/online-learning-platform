import { Directive, inject, input, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser, Location } from '@angular/common'
import { Router } from '@angular/router'

@Directive({
  selector: '[appBack]',
  host: { '(click)': 'goBack()' },
})
export class BackDirective {
  private location = inject(Location)
  private router = inject(Router)
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID))
  // Backup route
  readonly fallback = input<string>('/', { alias: 'appBack' })

  goBack() {
    if (this.isBrowser && history.length > 1) this.location.back()
    else this.router.navigate([this.fallback()])
  }
}
