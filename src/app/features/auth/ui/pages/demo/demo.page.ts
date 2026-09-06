import { afterNextRender, Component, inject } from '@angular/core'
import { AuthStore } from '../../../application/auth.store'
import { Router, RouterLink } from '@angular/router'
import { environment } from '../../../../../../environments/environment'
import { LucideArrowRight, LucideCircleAlert, LucideLoaderCircle } from '@lucide/angular'

@Component({
  selector: 'app-demo',
  imports: [RouterLink, LucideCircleAlert, LucideArrowRight, LucideLoaderCircle],
  templateUrl: './demo.page.html',
})
export class DemoPage {
  private authStore = inject(AuthStore)
  private router = inject(Router)
  protected readonly status = this.authStore.status

  constructor() {
    afterNextRender(() => {
      if (this.authStore.isAuthenticated()) {
        this.router.navigate(['/courses'])
        return
      }
      this.authStore.login(environment.demo)
    })
  }
}
