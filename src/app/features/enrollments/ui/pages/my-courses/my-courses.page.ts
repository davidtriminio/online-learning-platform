import { Component, effect, inject, signal } from '@angular/core'
import { AuthStore } from '../../../../auth/application/auth.store'
import { EnrollmentsStore } from '../../../application/enrollments.store'
import { EmptyState } from '../../../../../shared/ui/empty-state/empty-state'
import { DatePipe } from '@angular/common'
import { RouterLink } from '@angular/router'
import { ConfirmDialog } from '../../../../../shared/ui/confirm-dialog/confirm-dialog'
import { LucideArrowRight, LucideCalendar, LucideCircleCheck, LucideTrash2 } from '@lucide/angular'
import { CardSkeleton } from '../../../../../shared/ui/card-skeleton/card-skeleton'
import { ErrorState } from '../../../../../shared/ui/error-state/error-state'

@Component({
  selector: 'app-my-courses',
  imports: [
    EmptyState,
    DatePipe,
    RouterLink,
    ConfirmDialog,
    LucideCalendar,
    LucideCircleCheck,
    CardSkeleton,
    ErrorState,
    LucideArrowRight,
    LucideTrash2,
  ],
  templateUrl: './my-courses.page.html',
})
export class MyCoursesPage {
  private readonly auth = inject(AuthStore)
  protected readonly store = inject(EnrollmentsStore)

  protected readonly myCourses = this.store.myCourses
  protected readonly isLoading = this.store.isLoading
  protected readonly hasError = this.store.hasError

  protected readonly confirmOpen = signal(false)
  protected readonly target = signal<number | null>(null)
  protected readonly removing = signal(false)
  protected readonly removeError = signal<string | null>(null)

  constructor() {
    const userId = this.auth.user()?.id
    if (userId != null) this.store.loadByUser(userId)

    //   Async feedback only on delete
    effect(() => {
      if (!this.removing()) return
      const status = this.store.status()
      if (status === 'idle') {
        this.removing.set(false)
        this.confirmOpen.set(false)
        this.target.set(null)
      } else if (status === 'error') {
        this.removing.set(false)
        this.removeError.set('Failed to remove enrollment. Please try again.')
      }
    })
  }

  protected openConfirm(enrollmentId: number): void {
    this.removeError.set(null)
    this.target.set(enrollmentId)
    this.confirmOpen.set(true)
  }

  protected closeConfirm(): void {
    if (this.removing()) return
    this.confirmOpen.set(false)
    this.target.set(null)
  }

  protected onRemove(): void {
    const id = this.target()
    if (id === null) return
    this.removeError.set(null)
    this.removing.set(true)
    this.store.unenroll(id)
  }
}
