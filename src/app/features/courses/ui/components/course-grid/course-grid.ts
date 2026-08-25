import { Component, input } from '@angular/core'
import { Course } from '../../../domain/course.model'
import { CourseCard } from '../course-card/course-card'

@Component({
  selector: 'app-course-grid',
  imports: [CourseCard],
  templateUrl: './course-grid.html',
})
export class CourseGrid {
  readonly courses = input.required<Course[]>()
}
