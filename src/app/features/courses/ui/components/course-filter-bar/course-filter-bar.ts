import { Component, inject } from '@angular/core'
import { CoursesStore } from '../../../application/courses.store'
import { LucideSearch, LucideX } from '@lucide/angular'

@Component({
  selector: 'app-course-filter-bar',
  imports: [LucideSearch, LucideX],
  templateUrl: './course-filter-bar.html',
})
export class CourseFilterBar {
  protected readonly store = inject(CoursesStore)

  onInput(event: Event) {
    this.store.setSearchTerm((event.target as HTMLInputElement).value)
  }

  clear() {
    this.store.setSearchTerm('')
  }
}
