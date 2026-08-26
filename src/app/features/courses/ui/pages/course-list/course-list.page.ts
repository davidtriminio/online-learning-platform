import { Component, effect, inject, input } from '@angular/core'
import { CoursesStore } from '../../../application/courses.store'
import { Router, RouterLink } from '@angular/router'
import { CourseCard } from '../../components/course-card/course-card'
import { CardSkeleton } from '../../../../../shared/ui/card-skeleton/card-skeleton'
import { ErrorState } from '../../../../../shared/ui/error-state/error-state'
import { EmptyState } from '../../../../../shared/ui/empty-state/empty-state'
import { LucidePlus } from '@lucide/angular'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
import { debounceTime, distinctUntilChanged, skip } from 'rxjs'
import { CourseFilterBar } from '../../components/course-filter-bar/course-filter-bar'
import { CourseGrid } from '../../components/course-grid/course-grid'
import { SkeletonGrid } from '../../../../../shared/ui/skeleton-grid/skeleton-grid'

@Component({
  selector: 'app-course-list',
  imports: [
    RouterLink,
    ErrorState,
    EmptyState,
    LucidePlus,
    CourseFilterBar,
    CourseGrid,
    SkeletonGrid,
  ],
  templateUrl: './course-list.page.html',
})
export class CourseListPage {
  protected readonly store = inject(CoursesStore)
  protected readonly router = inject(Router)

  //   Router input: ?q=
  readonly q = input('', { transform: (v: string | undefined) => v ?? '' })

  constructor() {
    // URL -> storeL deep-link load/ back/forward button
    effect(() => this.store.setSearchTerm(this.q()))

    //   store -> URL
    toObservable(this.store.searchTerm)
      .pipe(skip(1), debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((term) =>
        this.router.navigate([], {
          queryParams: { q: term || null },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        }),
      )
  }
}
