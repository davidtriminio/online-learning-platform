import { Component, inject } from '@angular/core'
import { FavoritesStore } from '../../../application/favorites.store'
import { CoursesStore } from '../../../../courses/application/courses.store'
import { CardSkeleton } from '../../../../../shared/ui/card-skeleton/card-skeleton'
import { EmptyState } from '../../../../../shared/ui/empty-state/empty-state'
import { CourseGrid } from '../../../../courses/ui/components/course-grid/course-grid'

@Component({
  selector: 'app-favorites',
  imports: [CardSkeleton, EmptyState, CourseGrid],
  templateUrl: './favorites.page.html',
})
export class FavoritesPage {
  protected readonly favorites = inject(FavoritesStore)
  protected readonly courses = inject(CoursesStore)
}
