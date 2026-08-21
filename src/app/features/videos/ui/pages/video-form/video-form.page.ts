import { Component, computed, effect, inject, input, numberAttribute, signal } from '@angular/core'
import { Router } from '@angular/router'
import { VideosStore } from '../../../application/videos.store'
import { VideoForm, videoSchema } from '../../../application/videoSchema'
import { form, FormField } from '@angular/forms/signals'
import {
  LucideArrowLeft,
  LucideCheck,
  LucideCircleAlert,
  LucideClock12,
  LucideImageDown,
  LucideLink,
} from '@lucide/angular'

@Component({
  selector: 'app-video-form',
  imports: [
    FormField,
    LucideCircleAlert,
    LucideLink,
    LucideArrowLeft,
    LucideCheck,
    LucideImageDown,
    LucideClock12,
  ],
  templateUrl: './video-form.page.html',
})
export class VideoFormPage {
  private router = inject(Router)
  protected readonly store = inject(VideosStore)

  readonly id = input(undefined, { transform: numberAttribute })
  protected readonly isEdit = computed(() => {
    const id = this.id()
    return id !== undefined && !Number.isNaN(id)
  })

  protected readonly submitting = signal(false)
  protected readonly saveError = signal<string | null>(null)

  protected readonly model = signal<VideoForm>({
    url: '',
    title: '',
    description: '',
    thumbnail: '',
    duration: '',
  })
  protected readonly videoForm = form(this.model, videoSchema)

  constructor() {
    effect(() => {
      const id = this.id()
      if (id === undefined || Number.isNaN(id)) return
      const current = this.store.entityMap()[id]
      if (current) {
        this.model.set({
          url: current.url,
          title: current.title,
          description: current.description,
          thumbnail: current.thumbnail,
          duration: current.duration,
        })
      }
    })
    effect(() => {
      if (!this.submitting) return
      const status = this.store.status()
      if (status === 'idle') {
        this.submitting.set(false)
        this.router.navigate(['/videos'])
      } else if (status === 'error') {
        this.submitting.set(false)
        this.saveError.set('Could not save the video. Please try again.')
      }
    })
  }

  onSubmit(): void {
    this.videoForm.title().markAsTouched()
    this.videoForm.url().markAsTouched()
    if (this.videoForm().invalid()) return
    this.saveError.set(null)
    this.submitting.set(true)
    const value = this.videoForm().value()
    if (this.isEdit()) this.store.updateVideo({ id: this.id()!, input: value })
    else this.store.addVideo(value)
  }
}
