import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals'
import {
  addEntity,
  removeEntity,
  setAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities'
import { Video, VideoInput } from '../domain/video.model'
import { computed, inject } from '@angular/core'
import { VideoRepository } from '../infrastructure/video.repository'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs'

type VideoState = { status: 'idle' | 'loading' | 'error' }

export const VideosStore = signalStore(
  { providedIn: 'root' },
  withState<VideoState>({ status: 'idle' }),
  withEntities<Video>(),
  withComputed(({ entities, status }) => ({
    videos: computed(() => entities()),
    total: computed(() => entities().length),
    isLoading: computed(() => status() === 'loading'),
  })),
  withMethods((store, repo = inject(VideoRepository)) => ({
    loadAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { status: 'loading' })),
        switchMap(() =>
          repo.getAll().pipe(
            tap({
              next: (v) => patchState(store, setAllEntities(v), { status: 'idle' }),
              error: (e) => {
                console.error('[videos] load', e)
                patchState(store, { status: 'error' })
              },
            }),
            catchError(() => EMPTY),
          ),
        ),
      ),
    ),
    addVideo: rxMethod<VideoInput>(
      pipe(
        tap(() => patchState(store, { status: 'loading' })),
        switchMap((input) =>
          repo.add(input).pipe(
            tap({
              next: (video) => patchState(store, addEntity(video), { status: 'idle' }),
              error: (e) => {
                console.error('[videos] add', e)
                patchState(store, { status: 'error' })
              },
            }),
            catchError(() => EMPTY),
          ),
        ),
      ),
    ),
    updateVideo: rxMethod<{ id: number; input: VideoInput }>(
      pipe(
        tap(() => patchState(store, { status: 'loading' })),
        switchMap(({ id, input }) =>
          repo.update(id, input).pipe(
            tap({
              next: (video) =>
                patchState(store, updateEntity({ id: video.id, changes: video }), {
                  status: 'idle',
                }),
              error: (e) => {
                console.error('[videos] update', e)
                patchState(store, { status: 'error' })
              },
            }),
            catchError(() => EMPTY),
          ),
        ),
      ),
    ),
    deleteVideo: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { status: 'loading' })),
        switchMap((id) =>
          repo.delete(id).pipe(
            tap({
              next: () => patchState(store, removeEntity(id), { status: 'idle' }),
              error: (e) => {
                console.error('[videos] delete', e)
                patchState(store, { status: 'error' })
              },
            }),
            catchError(() => EMPTY),
          ),
        ),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadAll()
    },
  }),
)
