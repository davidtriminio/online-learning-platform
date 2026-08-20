import { Component, input } from '@angular/core'
import { Course } from '../../../domain/course.model'
import { CardContainer } from '../../../../../shared/ui/card-container/card-container'
import { LucideArrowRight, LucideCirclePlay, LucideClock } from '@lucide/angular'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-course-card',
  imports: [CardContainer, LucideClock, LucideCirclePlay, LucideArrowRight, RouterLink],
  templateUrl: './course-card.html',
})
export class CourseCard {
  readonly course = input.required<Course>()
}
