import { Component, computed, effect, inject, input, numberAttribute, signal } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { CoursesStore } from '../../../application/courses.store'
import {
  LucideArrowLeft,
  LucideBookmark,
  LucideCirclePlay,
  LucideClock,
  LucidePencil,
  LucidePlay,
  LucideTrash2,
} from '@lucide/angular'
import { EmptyState } from '../../../../../shared/ui/empty-state/empty-state'
import { ConfirmDialog } from '../../../../../shared/ui/confirm-dialog/confirm-dialog'

@Component({
  selector: 'app-course-detail',
  imports: [
    LucideClock,
    LucidePlay,
    LucideCirclePlay,
    LucideBookmark,
    LucideArrowLeft,
    EmptyState,
    RouterLink,
    LucideTrash2,
    LucidePencil,
    ConfirmDialog,
  ],
  templateUrl: './course-detail.page.html',
})
export class CourseDetailPage {
  private router = inject(Router)
  private readonly store = inject(CoursesStore)

  readonly id = input.required({ transform: numberAttribute })
  protected readonly course = computed(() => this.store.entityMap()[this.id()])

  protected readonly confirmOpen = signal(false)
  protected readonly deleting = signal(false)
  protected readonly deleteError = signal<string | null>(null)

  constructor() {
    effect(() => {
      if (!this.deleting()) return
      const status = this.store.status()
      if (status === 'idle') {
        this.deleting.set(false)
        this.confirmOpen.set(false)
        this.router.navigate(['/courses'])
      } else if (status === 'error') {
        this.deleting.set(false)
        this.deleteError.set('Failed to delete the course. Please try again.')
      }
    })
  }

  protected openConfirm(): void {
    this.deleteError.set(null)
    this.confirmOpen.set(true)
  }

  protected closeConfirm(): void {
    if (this.deleting()) return
    this.confirmOpen.set(false)
  }

  protected onDelete(): void {
    this.deleteError.set(null)
    this.deleting.set(true)
    this.store.deleteCourse(this.id())
  }
}
