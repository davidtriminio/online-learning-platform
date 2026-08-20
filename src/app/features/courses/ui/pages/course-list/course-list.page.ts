import { Component, inject } from '@angular/core'
import { CoursesStore } from '../../../application/courses.store'
import { RouterLink } from '@angular/router'
import { CourseCard } from '../../components/course-card/course-card'
import { CardSkeleton } from '../../../../../shared/ui/card-skeleton/card-skeleton'
import { ErrorState } from '../../../../../shared/ui/error-state/error-state'
import { EmptyState } from '../../../../../shared/ui/empty-state/empty-state'
import { LucidePlus } from '@lucide/angular'

@Component({
  selector: 'app-course-list',
  imports: [RouterLink, CourseCard, CardSkeleton, ErrorState, EmptyState, LucidePlus],
  templateUrl: './course-list.page.html',
})
export class CourseListPage {
  protected readonly store = inject(CoursesStore)
}
