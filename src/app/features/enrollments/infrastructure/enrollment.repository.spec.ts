import { afterEach, beforeEach, describe, expect } from 'vitest'
import { EnrollmentRepository } from './enrollment.repository'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { environment } from '../../../../environments/environment'
import { provideHttpClient } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { apiOk } from '../../../testing/mocks/api-response.mock'
import { enrollmentResponseDtoMock } from '../../../testing/mocks/enrollments.mock'

describe('EnrollmentRepository', () => {
  let repo: EnrollmentRepository
  let httpMock: HttpTestingController
  const base = environment.apiUrl

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    repo = TestBed.inject(EnrollmentRepository)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => httpMock.verify())

  it('getByUserId uses the lowercase ?userid= param', () => {
    repo.getByUserId(7).subscribe()
    //   gotcha F4: el backend exige 'userid' en minúsculas
    const req = httpMock.expectOne(`${base}GetEnrolledCourseByUserId?userid=7`)
    expect(req.request.method).toBe('GET')
    req.flush(apiOk([enrollmentResponseDtoMock]))
  })

  it('create POSTs a thin write DTO', () => {
    repo.create({ userId: 7, courseId: 3 }).subscribe()
    const req = httpMock.expectOne(`${base}CreateNewEnrollment`)
    expect(req.request.body).toMatchObject({
      enrollmentId: 0,
      userId: 7,
      courseId: 3,
      isCompleted: false,
    })
    req.flush(apiOk(enrollmentResponseDtoMock))
  })

  it('delete sends enrollmentId as query param', () => {
    repo.delete(11).subscribe()
    const req = httpMock.expectOne(`${base}DeleteEnrollment?enrollmentId=11`)
    expect(req.request.method).toBe('DELETE')
    req.flush(apiOk(null))
  })
})
