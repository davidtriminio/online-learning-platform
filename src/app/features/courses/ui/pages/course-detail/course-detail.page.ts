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
  LucideBookmark,
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
  ],
  templateUrl: './course-detail.page.html',
})
export class CourseDetailPage {
  private router = inject(Router)
  private destroyRef = inject(DestroyRef)
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

  protected readonly selectedVideoUrl = signal<string | null>(null)
  protected readonly videoToAdd = signal<number | null>(null)

  // Borrado de curso
  protected readonly confirmOpen = signal(false)
  protected readonly deleting = signal(false)
  protected readonly deleteError = signal<string | null>(null)

  constructor() {
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

  protected play(url: string): void {
    this.selectedVideoUrl.set(url)
  }

  protected addVideo(): void {
    const videoId = this.videoToAdd()
    if (videoId === null) return
    this.courseVideoRepo
      .addToCourse(this.id(), videoId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.courseVideos.reload())
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
