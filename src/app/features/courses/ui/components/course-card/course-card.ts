import { Component, input } from '@angular/core'
import { Course } from '../../../domain/course.model'
import { CardContainer } from '../../../../../shared/ui/card-container/card-container'
import { LucideCirclePlay, LucideClock } from '@lucide/angular'

@Component({
  selector: 'app-course-card',
  imports: [CardContainer, LucideClock, LucideCirclePlay],
  templateUrl: './course-card.html',
})
export class CourseCard {
  readonly course = input.required<Course>()
}
