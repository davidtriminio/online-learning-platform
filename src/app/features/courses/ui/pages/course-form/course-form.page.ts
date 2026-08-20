import { Component, computed, effect, inject, input, numberAttribute, signal } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { CoursesStore } from '../../../application/courses.store'
import { CourseForm, courseSchema } from '../../../application/course.schema'
import { form, FormField } from '@angular/forms/signals'
import {
  LucideArrowLeft,
  LucideCheck,
  LucideCircleAlert,
  LucideClock,
  LucideImage,
  LucideLoaderCircle,
} from '@lucide/angular'

@Component({
  selector: 'app-course-form',
  imports: [
    FormField,
    LucideCheck,
    LucideArrowLeft,
    LucideClock,
    LucideCircleAlert,
    LucideImage,
    RouterLink,
    LucideLoaderCircle,
  ],
  templateUrl: './course-form.page.html',
})
export class CourseFormPage {
  private router = inject(Router)
  private readonly store = inject(CoursesStore)

  readonly id = input(undefined, { transform: numberAttribute })
  protected readonly isEdit = computed(() => this.id() !== undefined)

  // Estado del envío
  protected readonly submitting = signal(false)
  protected readonly saveError = signal<string | null>(null)

  protected readonly model = signal<CourseForm>({
    name: '',
    description: '',
    totalHours: 1,
    thumbnailUrl: '',
  })
  protected readonly courseForm = form(this.model, courseSchema)

  constructor() {
    //   Precarga si se está editando
    effect(() => {
      const id = this.id()
      if (id === undefined) return
      const current = this.store.entityMap()[id]
      if (current) {
        this.model.set({
          name: current.name,
          description: current.description,
          totalHours: current.totalHours,
          thumbnailUrl: current.thumbnailUrl,
        })
      }
    })

    // reacionar al resultado: naveta en éxito, avisa al error
    effect(() => {
      if (!this.submitting()) return
      const status = this.store.status()
      if (status === 'idle') {
        this.submitting.set(false)
        this.router.navigate(['/courses'])
      } else if (status === 'error') {
        this.submitting.set(false)
        this.saveError.set('Could not save the course. Please try again.')
      }
    })
  }

  onSubmit() {
    this.courseForm.name().markAsTouched()
    this.courseForm.description().markAsTouched()
    this.courseForm.totalHours().markAsTouched()
    this.courseForm.thumbnailUrl().markAsTouched()
    if (this.courseForm().invalid()) return

    this.saveError.set(null)
    this.submitting.set(true)

    const value = this.courseForm().value()
    if (this.isEdit()) {
      this.store.updateCourse({ id: this.id()!, input: value })
    } else {
      this.store.addCourse(value)
    }
  }
}
