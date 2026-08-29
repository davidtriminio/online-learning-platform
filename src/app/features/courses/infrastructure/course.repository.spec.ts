import { afterEach, beforeEach, describe, it } from 'vitest'
import { courseMock, courseResponseDtoMock } from '../../../testing/mocks/courses.mock'
import { CourseRepository } from './course.repository'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { apiOk } from '../../../testing/mocks/api-response.mock'
import { environment } from '../../../../environments/environment'
import { TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'

describe('CourseRepository', () => {
  let repo: CourseRepository
  let httpMock: HttpTestingController
  const base = environment.apiUrl

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    repo = TestBed.inject(CourseRepository)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => httpMock.verify())

  it('getAll GETs and maps to entities', () => {
    let result: unknown
    repo.getAll().subscribe((r) => (result = r))

    const req = httpMock.expectOne(`${base}GetAllCourse`)
    expect(req.request.method).toBe('GET')
    req.flush(apiOk([courseResponseDtoMock]))

    expect(result).toEqual([courseMock])
  })

  it('add POSTs the request DTO', () => {
    repo.add({ name: 'New', description: 'D', totalHours: 4, thumbnailUrl: 'x' }).subscribe()

    const req = httpMock.expectOne(`${base}AddNewCourse`)
    expect(req.request.method).toBe('POST')
    //   createdDate es now() → no aserto exacto; sí los campos deterministas
    expect(req.request.body).toMatchObject({
      courseId: 0,
      courseName: 'New',
      totalHours: '4',
      totalVideos: 0,
    })
    req.flush(apiOk(courseResponseDtoMock))
  })

  it('delete sends courseId as query param', () => {
    repo.delete(3).subscribe()
    const req = httpMock.expectOne(`${base}DeleteCourseById?courseId=3`)
    expect(req.request.method).toBe('DELETE')
    req.flush(apiOk(true))
  })
})
