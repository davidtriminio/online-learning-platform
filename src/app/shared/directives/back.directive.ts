import { Directive, inject, input } from '@angular/core'
import { Location } from '@angular/common'
import { Router } from '@angular/router'

@Directive({
  selector: '[appBack]',
  host: { '(click)': 'goBack()' },
})
export class BackDirective {
  private location = inject(Location)
  private router = inject(Router)

  // Backup route
  readonly fallback = input<string>('/', { alias: 'appBack' })

  goBack() {
    if (history.length > 1) this.location.back()
    else this.router.navigate([this.fallback()])
  }
}
