import { Component, inject } from '@angular/core'
import { LoadingStore } from '../../../core/loading/loading.store'
import { LucideLoaderCircle } from '@lucide/angular'

@Component({
  selector: 'app-loading-overlay',
  imports: [LucideLoaderCircle],
  templateUrl: './loading-overlay.html',
})
export class LoadingOverlay {
  protected readonly loading = inject(LoadingStore)
}
