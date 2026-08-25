import { computed, effect, inject, Injectable, signal } from '@angular/core'
import { AuthStore } from '../../auth/application/auth.store'
import { CoursesStore } from '../../courses/application/courses.store'
import { FavoritesStorageService } from '../infrastructure/favorites-storage.service'
import { Course } from '../../courses/domain/course.model'

@Injectable({ providedIn: 'root' })
export class FavoritesStore {
  private readonly auth = inject(AuthStore)
  private readonly courses = inject(CoursesStore)
  private readonly storage = inject(FavoritesStorageService)

  private readonly _ids = signal<ReadonlySet<number>>(new Set())
  readonly ids = this._ids.asReadonly()
  readonly count = computed(() => this.ids().size)

  //   ids <-> catalog
  readonly favoriteCourses = computed<Course[]>(() => {
    const map = this.courses.entityMap()
    return [...this.ids()].map((id) => map[id]).filter((c): c is Course => !!c)
  })

  constructor() {
    //   storage -> state: rehydrate to reload sesion /change user
    effect(() => {
      const userId = this.auth.user()?.id ?? null
      this._ids.set(this.storage.load(userId))
    })
  }

  isFavorite(courseId: number): boolean {
    return this._ids().has(courseId)
  }

  toggle(courseId: number): void {
    const next = new Set(this._ids())
    next.has(courseId) ? next.delete(courseId) : next.add(courseId)
    this._ids.set(next)
    this.persist(next)
  }

  //   state -> storage
  private persist(ids: ReadonlySet<number>): void {
    const userId = this.auth.user()?.id
    if (userId != null) this.storage.save(userId, ids)
  }
}
