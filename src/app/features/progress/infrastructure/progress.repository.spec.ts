import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ProgressRepository } from './progress.repository'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { environment } from '../../../../environments/environment'
import { provideHttpClient } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { apiOk } from '../../../testing/mocks/api-response.mock'
import { progressResponseDtoMock } from '../../../testing/mocks/progress.mock'
import { toVideoProgress } from './mappers/progress.mapper'

describe('ProgressRepository', () => {
  let repo: ProgressRepository
  let httpMock: HttpTestingController
  const base = environment.apiUrl

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    repo = TestBed.inject(ProgressRepository)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => httpMock.verify())

  it('getByEnrollmentId uses the enrollmentId query param', () => {
    repo.getByEnrollmentId(11).subscribe()
    const req = httpMock.expectOne(`${base}GetProgressByEnrollmentId?enrollmentId=11`)
    expect(req.request.method).toBe('GET')
    req.flush(apiOk([progressResponseDtoMock]))
  })

  it('start POSTs the raw ProgressInput (deuda: no usa toStartRequestDto)', () => {
    repo.start({ enrollmentId: 11, videoId: 100 }).subscribe()
    const req = httpMock.expectOne(`${base}addStartProgress`)
    expect(req.request.body).toEqual({ enrollmentId: 11, videoId: 100 })
    req.flush(apiOk(progressResponseDtoMock))
  })

  it('complete POSTs the complete DTO reusing progressId', () => {
    const baseProgress = toVideoProgress(progressResponseDtoMock)
    repo.complete(baseProgress).subscribe()
    const req = httpMock.expectOne(`${base}addCompleteProgress`)
    expect(req.request.body).toMatchObject({ progressId: 21, isCompleted: true })
    req.flush(apiOk(progressResponseDtoMock))
  })
})
