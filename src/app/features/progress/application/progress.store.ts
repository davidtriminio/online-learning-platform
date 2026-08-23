import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { setAllEntities, setEntity, withEntities } from '@ngrx/signals/entities'
import { computed, inject } from '@angular/core'
import { ProgressInput, VideoProgress } from '../domain/video-progress.model'
import { ProgressRepository } from '../infrastructure/progress.repository'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { catchError, EMPTY, of, pipe, switchMap, tap } from 'rxjs'

type ProgressState = { status: 'idle' | 'loading' | 'error' }

export const ProgressStore = signalStore(
  { providedIn: 'root' },
  withState<ProgressState>({ status: 'idle' }),
  withEntities<VideoProgress>(),
  withComputed(({ entities, status }) => ({
    isLoading: computed(() => status() === 'loading'),
    progressByVideoId: computed(() => {
      const m = new Map<number, VideoProgress>()
      for (const p of entities()) m.set(p.videoId, p)
      return m
    }),
    completeVideoIds: computed(
      () =>
        new Set(
          entities()
            .filter((p) => p.isCompleted)
            .map((p) => p.videoId),
        ),
    ),
  })),
  withMethods((store, repo = inject(ProgressRepository)) => {
    const upsert = (p: VideoProgress) => patchState(store, setEntity(p), { status: 'idle' })
    const fail = (tag: string) => (e: unknown) => {
      console.error(`[progress] ${tag}, e`)
      patchState(store, { status: 'error' })
    }
    return {
      loadByEnrollment: rxMethod<number>(
        pipe(
          tap(() => patchState(store, { status: 'loading' })),
          switchMap((enrollmentId) =>
            repo.getByEnrollmentId(enrollmentId).pipe(
              tap({
                next: (list) => patchState(store, setAllEntities(list), { status: 'idle' }),
                error: fail('load'),
              }),
              catchError(() => EMPTY),
            ),
          ),
        ),
      ),
      start: rxMethod<ProgressInput>(
        pipe(
          switchMap((input) => {
            if (store.progressByVideoId().has(input.videoId)) return EMPTY
            patchState(store, { status: 'loading' })
            return repo.start(input).pipe(
              tap({ next: upsert, error: fail('start') }),
              catchError(() => EMPTY),
            )
          }),
        ),
      ),
      //   Start-then-complete: youtube coveage.
      complete: rxMethod<ProgressInput>(
        pipe(
          tap(() => patchState(store, { status: 'loading' })),
          switchMap((input) => {
            const existing = store.progressByVideoId().get(input.videoId)
            const base$ = existing ? of(existing) : repo.start(input)
            return base$.pipe(
              switchMap((base) => repo.complete(base)),
              tap({ next: upsert, error: fail('complete') }),
              catchError(() => EMPTY),
            )
          }),
        ),
      ),
    }
  }),
)
