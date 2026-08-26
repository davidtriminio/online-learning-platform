import { Component, inject } from '@angular/core'
import { FavoritesStore } from '../../../application/favorites.store'
import { CoursesStore } from '../../../../courses/application/courses.store'
import { EmptyState } from '../../../../../shared/ui/empty-state/empty-state'
import { CourseGrid } from '../../../../courses/ui/components/course-grid/course-grid'
import { SkeletonGrid } from '../../../../../shared/ui/skeleton-grid/skeleton-grid'

@Component({
  selector: 'app-favorites',
  imports: [EmptyState, CourseGrid, SkeletonGrid],
  templateUrl: './favorites.page.html',
})
export class FavoritesPage {
  protected readonly favorites = inject(FavoritesStore)
  protected readonly courses = inject(CoursesStore)
}
