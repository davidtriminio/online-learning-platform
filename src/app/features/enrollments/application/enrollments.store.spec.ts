import { expect, beforeEach, afterEach } from 'vitest'
import { TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { EnrollmentsStore } from './enrollments.store'
import { environment } from '../../../../environments/environment'
import { apiOk } from '../../../testing/mocks/api-response.mock'
import { courseListDtoMock } from '../../../testing/mocks/courses.mock'
import { enrollmentResponseDtoMock } from '../../../testing/mocks/enrollments.mock'

describe('EnrollmentsStore', () => {
  let store: InstanceType<typeof EnrollmentsStore>
  let httpMock: HttpTestingController
  const base = environment.apiUrl

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    store = TestBed.inject(EnrollmentsStore) // CoursesStore instance → onInit GET
    httpMock = TestBed.inject(HttpTestingController)
    httpMock.expectOne(`${base}GetAllCourse`).flush(apiOk(courseListDtoMock)) // catálogo
    store.loadByUser(7)
    httpMock
      .expectOne(`${base}GetEnrolledCourseByUserId?userid=7`)
      .flush(apiOk([enrollmentResponseDtoMock])) // courseId 3 ∈ catalog
  })

  afterEach(() => httpMock.verify())

  it('joins enrollment with the course from the catalog', () => {
    expect(store.myCourses()).toHaveLength(1)
    expect(store.myCourses()[0].course.name).toBe('Angular Fundamentals')
  })

  it('indexes enrollments by courseId', () => {
    expect(store.enrollmentByCourseId().get(3)?.id).toBe(11)
  })
})
