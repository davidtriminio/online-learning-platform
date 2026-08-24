import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals'
import { addEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities'
import { Course, CourseInput } from '../domain/course.model'
import { computed, inject } from '@angular/core'
import { CourseRepository } from '../infrastructure/course.repository'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs'

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

type CoursesState = { status: 'idle' | 'loading' | 'error'; searchTerm: string }

export const CoursesStore = signalStore(
  { providedIn: 'root' },
  withState<CoursesState>({ status: 'idle', searchTerm: '' }),
  withEntities<Course>(),
  withComputed(({ entities, status, searchTerm }) => ({
    courses: computed(() => entities()),
    total: computed(() => entities().length),
    isLoading: computed(() => status() === 'loading'),
    hasError: computed(() => status() === 'error'),
    filteredCourses: computed(() => {
      const term = normalize(searchTerm().trim())
      if (!term) return entities()
      return entities().filter(
        (c) => normalize(c.name).includes(term) || normalize(c.description).includes(term)
      )
    }),
    hasSearch: computed(() => searchTerm().trim().length > 0)
  })),
  withMethods((store, repo = inject(CourseRepository)) => {
    const refresh = rxMethod<void>(
      pipe(
        tap(() => patchState(store, { status: 'loading' })),
        switchMap(() =>
          repo.getAll().pipe(
            tap({
              next: (courses) => patchState(store, setAllEntities(courses), { status: 'idle' }),
              error: (e) => {
                console.error('[courses] load failed', e)
                patchState(store, { status: 'error' })
              },
            }),
            catchError(() => EMPTY),
          ),
        ),
      ),
    )
    return {
      loadAll: refresh,
      addCourse: rxMethod<CourseInput>(
        pipe(
          tap(() => patchState(store, { status: 'loading' })),
          switchMap((input) =>
            repo.add(input).pipe(
              tap({
                next: (course) => patchState(store, addEntity(course), { status: 'idle' }),
                error: () => patchState(store, { status: 'error' }),
              }),
              catchError(() => EMPTY),
            ),
          ),
        ),
      ),
      updateCourse: rxMethod<{ id: number; input: CourseInput }>(
        pipe(
          tap(() => patchState(store, { status: 'loading' })),
          switchMap(({ id, input }) => {
            const base = store.entityMap()[id]
            if (!base) {
              console.error('[courses] update base not found for id', id)
              patchState(store, { status: 'error' })
              return EMPTY
            }
            return repo.update(base, input).pipe(
              tap({
                next: (course) =>
                  patchState(store, updateEntity({ id: course.id, changes: course }), {
                    status: 'idle',
                  }),
                error: () => patchState(store, { status: 'error' }),
              }),
              catchError(() => EMPTY),
            )
          }),
        ),
      ),
      deleteCourse: rxMethod<number>(
        pipe(
          tap(() => patchState(store, { status: 'loading' })),
          switchMap((id) =>
            repo.delete(id).pipe(
              tap({
                next: () => refresh(),
                error: (e) => {
                  console.error('[courses] delete failed', e)
                  patchState(store, { status: 'error' })
                },
              }),
              catchError(() => EMPTY),
            ),
          ),
        ),
      ),
      setSearchTerm(term: string){
        patchState(store, {searchTerm: term})
      }
    }
  }),
  withHooks({
    onInit(store) {
      store.loadAll()
    },
  }),
)
