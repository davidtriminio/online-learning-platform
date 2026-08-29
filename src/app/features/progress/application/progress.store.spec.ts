import { afterEach, beforeEach, describe, expect } from 'vitest'
import { environment } from '../../../../environments/environment'
import { TestBed } from '@angular/core/testing'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http'
import { ProgressStore } from './progress.store'
import { apiOk } from '../../../testing/mocks/api-response.mock'
import { progressListDtoMock } from '../../../testing/mocks/progress.mock'

describe('ProgressStore', () => {
  let store: InstanceType<typeof ProgressStore>
  let httpMock: HttpTestingController
  const base = environment.apiUrl

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    store = TestBed.inject(ProgressStore)
    httpMock = TestBed.inject(HttpTestingController)
    //   sin onInit: cargo explícito
    store.loadByEnrollment(11)
    httpMock
      .expectOne(`${base}GetProgressByEnrollmentId?enrollmentId=11`)
      .flush(apiOk(progressListDtoMock))
  })

  afterEach(() => httpMock.verify())

  it('completeVideoIds contains only completed videos', () => {
    expect(store.completeVideoIds()).toEqual(new Set([100]))
  })

  it('start is a no-op when the video already has progress (guard)', () => {
    store.start({ enrollmentId: 11, videoId: 100 }) // ya existe → EMPTY
    httpMock.expectNone(`${base}addStartProgress`)
  })

  it('start POSTs when the video has no progress yet', () => {
    store.start({ enrollmentId: 11, videoId: 999 })
    const req = httpMock.expectOne(`${base}addStartProgress`)
    req.flush(
      apiOk({ ...progressListDtoMock[0], progressId: 30, videoId: 999, isCompleted: false }),
    )
    expect(store.progressByVideoId().has(999)).toBe(true)
  })
})
