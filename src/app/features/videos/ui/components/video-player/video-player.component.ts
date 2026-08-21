import { Component, computed, ElementRef, inject, input, output, viewChild } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/)
  return m ? m[1] : null
}

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
})
export class VideoPlayerComponent {
  private sanitizer = inject(DomSanitizer)

  readonly src = input.required<string>()
  readonly ended = output<void>()
  readonly progress = output<{ currentTime: number; duration: number }>()

  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('video')

  protected readonly isYoutube = computed(() => youtubeId(this.src()) !== null)
  protected readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const id = youtubeId(this.src())
    return id
      ? this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}`)
      : null
  })

  protected onTimeUpdate(): void {
    const el = this.video()?.nativeElement
    if (!el) return
    this.progress.emit({ currentTime: el.currentTime, duration: el.duration })
  }
}
