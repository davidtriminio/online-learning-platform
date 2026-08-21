import { Component, inject, signal } from '@angular/core'
import { VideosStore } from '../../../application/videos.store'
import { EmptyState } from '../../../../../shared/ui/empty-state/empty-state'
import { ErrorState } from '../../../../../shared/ui/error-state/error-state'
import { RouterLink } from '@angular/router'
import { ConfirmDialog } from '../../../../../shared/ui/confirm-dialog/confirm-dialog'
import { LucideClock, LucidePencil, LucidePlus, LucideTrash2 } from '@lucide/angular'

@Component({
  selector: 'app-video-list',
  imports: [
    EmptyState,
    ErrorState,
    RouterLink,
    ConfirmDialog,
    LucidePlus,
    LucidePencil,
    LucideTrash2,
    LucideClock,
  ],
  templateUrl: './video-list.page.html',
})
export class VideoListPage {
  protected readonly store = inject(VideosStore)
  protected readonly toDelete = signal<number | null>(null)

  protected askDelete(id: number): void {
    this.toDelete.set(id)
  }
  protected cancelDelete(): void {
    this.toDelete.set(null)
  }
  protected confirmDelete(): void {
    const id = this.toDelete()
    if (id !== null) this.store.deleteVideo(id)
    this.toDelete.set(null)
  }
}
