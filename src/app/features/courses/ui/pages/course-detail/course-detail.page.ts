import { Component, computed, inject, input, numberAttribute, signal } from '@angular/core'
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
  LucideTriangleAlert,
} from '@lucide/angular'
import { EmptyState } from '../../../../../shared/ui/empty-state/empty-state'

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
    LucideTriangleAlert,
  ],
  templateUrl: './course-detail.page.html',
})
export class CourseDetailPage {
  private router = inject(Router)
  private readonly store = inject(CoursesStore)

  readonly id = input.required({ transform: numberAttribute })
  protected readonly course = computed(() => this.store.entityMap()[this.id()])

  protected readonly confirmOpen = signal(false)

  protected openConfirm(): void {
    this.confirmOpen.set(true)
  }

  protected closeConfirm(): void {
    this.confirmOpen.set(false)
  }

  protected onDelete(): void {
    this.store.deleteCourse(this.id())
    this.confirmOpen.set(false)
    this.router.navigate(['/courses'])
  }
}
