import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { CoursesStore } from '../../../application/courses.store'
import {
  LucideArrowLeft,
  LucideBookmark, LucideCircleAlert,
  LucideCirclePlay,
  LucideClock,
  LucidePencil,
  LucidePlay,
  LucidePlus,
  LucideTrash2,
  LucideX,
} from '@lucide/angular'
import { EmptyState } from '../../../../../shared/ui/empty-state/empty-state'
import { ErrorState } from '../../../../../shared/ui/error-state/error-state'
import { ConfirmDialog } from '../../../../../shared/ui/confirm-dialog/confirm-dialog'
import { CourseVideoRepository } from '../../../infrastructure/course-video.repository'
import { VideosStore } from '../../../../videos/application/videos.store'
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { VideoPlayerComponent } from '../../../../videos/ui/components/video-player/video-player.component'
import { Button } from '../../../../../shared/ui/button/button/button'
import { AuthStore } from '../../../../auth/application/auth.store'
import { EnrollmentsStore } from '../../../../enrollments/application/enrollments.store'

@Component({
  selector: 'app-course-detail',
  imports: [
    LucideClock,
    LucidePlay,
    LucideCirclePlay,
    LucideBookmark,
    LucideArrowLeft,
    EmptyState,
    RouterLink,
    LucideTrash2,
    LucidePencil,
    LucidePlus,
    LucideX,
    ConfirmDialog,
    VideoPlayerComponent,
    ErrorState,
    Button,
    LucideCircleAlert,
  ],
  templateUrl: './course-detail.page.html',
})
export class CourseDetailPage {
  private router = inject(Router)
  private destroyRef = inject(DestroyRef)

  private readonly auth = inject(AuthStore)
  private readonly enrollments = inject(EnrollmentsStore)

  protected readonly isEnrolled = computed(() =>
    this.enrollments.enrollmentByCourseId().has(this.id())
  )

  protected readonly enrolling = signal(false)
  protected readonly enrollError = signal<string | null>(null)

  private readonly store = inject(CoursesStore)
  protected readonly isLoading = this.store.isLoading
  protected readonly hasError = this.store.hasError

  private courseVideoRepo = inject(CourseVideoRepository)
  protected readonly videosStore = inject(VideosStore)

  readonly id = input.required({ transform: numberAttribute })
  protected readonly course = computed(() => this.store.entityMap()[this.id()])

  // Vides del curso
  protected readonly courseVideos = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.courseVideoRepo.byCourseId(params),
  })

  // Filter Picker
  protected readonly availableVideos = computed(() => {
    const linked = new Set((this.courseVideos.value() ?? []).map((cv) => cv.videoId))
    return this.videosStore.videos().filter((v) => !linked.has(v.id))
  })

  protected readonly selectedVideoUrl = signal<string | null>(null)
  protected readonly videoToAdd = signal<number | null>(null)

  // Borrado de curso
  protected readonly confirmOpen = signal(false)
  protected readonly deleting = signal(false)
  protected readonly deleteError = signal<string | null>(null)

  protected readonly addError = signal<string | null>(null)

  constructor() {
    const userId = this.auth.user()?.id
    if(userId != null) this.enrollments.loadByUser(userId)

    effect(() => {
      if (!this.enrolling()) return
      const status = this.enrollments.status()
      if (status === 'idle'){
        this.enrolling.set(false)
      } else if (status === 'error'){
        this.enrolling.set(false)
        this.enrollError.set('Enrollment failed. Please try again.')
      }
    })

    effect(() => {
      if (!this.deleting()) return
      const status = this.store.status()
      if (status === 'idle') {
        this.deleting.set(false)
        this.confirmOpen.set(false)
        this.router.navigate(['/courses'])
      } else if (status === 'error') {
        this.deleting.set(false)
        this.deleteError.set('Failed to delete the course. Please try again.')
      }
    })
  }

  protected enroll(): void{
    const userId = this.auth.user()?.id
    if (userId == null) return
    this.enrollError.set(null)
    this.enrolling.set(true)
    this.enrollments.enroll({userId, courseId: this.id()})
  }

  protected unenroll(): void {
    const enrollment = this.enrollments.enrollmentByCourseId().get(this.id())
    if (!enrollment) return
    this.enrollError.set(null)
    this.enrolling.set(true)
    this.enrollments.unenroll(enrollment.id)
  }

  protected play(url: string): void {
    this.selectedVideoUrl.set(url)
  }

  protected addVideo(): void {
    const videoId = this.videoToAdd()
    if (videoId === null) return
    this.courseVideoRepo
      .addToCourse(this.id(), videoId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.videoToAdd.set(null)
          this.courseVideos.reload()
        },
        error: (e: Error) => this.addError.set(e.message),
      })
  }

  protected openConfirm(): void {
    this.deleteError.set(null)
    this.confirmOpen.set(true)
  }

  protected closeConfirm(): void {
    if (this.deleting()) return
    this.confirmOpen.set(false)
  }

  protected onDelete(): void {
    this.deleteError.set(null)
    this.deleting.set(true)
    this.store.deleteCourse(this.id())
  }
}
