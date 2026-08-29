import { expect, beforeEach, afterEach } from 'vitest'
import { TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { CourseVideoRepository } from './course-video.repository'
import { environment } from '../../../../environments/environment'
import { apiOk } from '../../../testing/mocks/api-response.mock'
import { courseVideoResponseDtoMock } from '../../../testing/mocks/course-video.mock'

describe('CourseVideoRepository', () => {
  let repo: CourseVideoRepository
  let httpMock: HttpTestingController
  const base = environment.apiUrl

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    repo = TestBed.inject(CourseVideoRepository)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => httpMock.verify())

  it('byCourseId GETs with the courseId param and maps', () => {
    let result: unknown
    repo.byCourseId(3).subscribe((r) => (result = r))
    const req = httpMock.expectOne(`${base}GetCourseVideosbyCourseId?courseId=3`)
    expect(req.request.method).toBe('GET')
    req.flush(apiOk([courseVideoResponseDtoMock]))
    expect(result).toHaveLength(1)
  })

  it('addToCourse POSTs the pair and resolves on result:true', () => {
    let done = false
    repo.addToCourse(3, 100).subscribe(() => (done = true))
    const req = httpMock.expectOne(`${base}AddNewCourseVideo`)
    expect(req.request.body).toEqual({ courseId: 3, videoId: 100 })
    req.flush(apiOk(null))
    expect(done).toBe(true)
  })

  it('addToCourse throws when the API returns result:false', () => {
    let err: unknown
    repo.addToCourse(3, 100).subscribe({ error: (e) => (err = e) })
    httpMock
      .expectOne(`${base}AddNewCourseVideo`)
      .flush({ message: 'already linked', result: false, data: null })
    expect((err as Error).message).toBe('already linked')
  })

  it('removeFromCourse DELETEs with courseVideoId', () => {
    repo.removeFromCourse(50).subscribe()
    const req = httpMock.expectOne(`${base}DeleteVideoFromCourse?courseVideoId=50`)
    expect(req.request.method).toBe('DELETE')
    req.flush(null)
  })
})
