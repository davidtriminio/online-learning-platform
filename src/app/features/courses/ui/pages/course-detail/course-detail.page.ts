import { Component, computed, inject, input, numberAttribute } from '@angular/core'
import { Router } from '@angular/router'
import { CoursesStore } from '../../../application/courses.store'
import { LucideArrowLeft, LucideBookmark, LucideCirclePlay, LucideClock, LucidePlay } from '@lucide/angular';
import { EmptyState } from '../../../../../shared/ui/empty-state/empty-state';

@Component({
  selector: 'app-course-detail',
  imports: [LucideClock, LucidePlay, LucideCirclePlay, LucideBookmark, LucideArrowLeft, EmptyState],
  templateUrl: './course-detail.page.html',
})
export class CourseDetailPage {
  private router = inject(Router);
  private readonly store = inject(CoursesStore);

  readonly id = input.required({ transform: numberAttribute });
  protected readonly course = computed(() => this.store.entityMap()[this.id()]);

  protected onDelete(): void {
    this.store.deleteCourse(this.id());
    this.router.navigate(['/courses']);
  }
}
