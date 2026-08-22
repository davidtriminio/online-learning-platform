import { Enrollment, EnrollmentInput } from '../domain/enrollment.model'
import { Course } from '../../courses/domain/course.model'
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { setAllEntities, withEntities } from '@ngrx/signals/entities'
import { computed, inject } from '@angular/core'
import { CoursesStore } from '../../courses/application/courses.store'
import { EnrollmentRepository } from '../infrastructure/enrollment.repository'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs'

export type EnrolledCourse = {
  readonly enrollment: Enrollment
  readonly course: Course
}

type EnrollmentsState = {
  status: 'idle' | 'loading' | 'error'
  userId: number | null
}

export const EnrollmentsStore = signalStore(
  { providedIn: 'root' },
  withState<EnrollmentsState>({ status: 'idle', userId: null }),
  withEntities<Enrollment>(),
  withComputed(({ entities, status }, courses = inject(CoursesStore)) => ({
    isLoading: computed(() => status() === 'loading'),
    hasError: computed(() => status() === 'error'),

    //   enrollment.courseId <-> catalogo
    myCourses: computed<EnrolledCourse[]>(() => {
      const map = courses.entityMap()
      return entities()
        .map((enrollment) => ({ enrollment, course: map[enrollment.courseId] }))
        .filter((x): x is EnrolledCourse => !!x.course)
    }),

    //   avoid double data
    enrollmentByCourseId: computed(() => {
      const m = new Map<number, Enrollment>()
      for (const e of entities()) m.set(e.courseId, e)
      return m
    }),
  })),
  withMethods((store, repo = inject(EnrollmentRepository)) => {
    const reload = rxMethod<number>(
      pipe(
        tap(() => patchState(store, { status: 'loading' })),
        switchMap((userId) =>
          repo.getByUserId(userId).pipe(
            tap({
              next: (list) => patchState(store, setAllEntities(list), { status: 'idle', userId }),
              error: (e) => {
                console.error('[enrollments] load failed', e)
                patchState(store, { status: 'error' })
              },
            }),
            catchError(() => EMPTY),
          ),
        ),
      ),
    )
    return {
      loadByUser: reload,
      enroll: rxMethod<EnrollmentInput>(
        pipe(
          tap(() => patchState(store, { status: 'loading' })),
          switchMap((input) =>
            repo.create(input).pipe(
              tap({
                next: () => reload(input.userId),
                error: (e) => {
                  console.error('[enrollments] enroll failed', e)
                  patchState(store, { status: 'error' })
                },
              }),
              catchError(() => EMPTY),
            ),
          ),
        ),
      ),
      unenroll: rxMethod<number>(
        pipe(
          tap(() => patchState(store, { status: 'loading' })),
          switchMap((enrollmentId) =>
            repo.delete(enrollmentId).pipe(
              tap({
                next: () => {
                  const userId = store.userId()
                  if (userId !== null) reload(userId)
                  else patchState(store, { status: 'idle' })
                },
                error: (e) => {
                  console.error('[enrollments] unenroll failed', e)
                  patchState(store, { status: 'error' })
                },
              }),
              catchError(() => EMPTY),
            ),
          ),
        ),
      ),
    }
  }),
)
