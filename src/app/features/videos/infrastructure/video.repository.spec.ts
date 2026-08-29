import { expect, beforeEach, afterEach } from 'vitest'
import { TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { VideoRepository } from './video.repository'
import { environment } from '../../../../environments/environment'
import { apiOk } from '../../../testing/mocks/api-response.mock'
import { videoResponseDtoMock, videoMock } from '../../../testing/mocks/videos.mock'

describe('VideoRepository', () => {
  let repo: VideoRepository
  let httpMock: HttpTestingController
  const base = environment.apiUrl

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    repo = TestBed.inject(VideoRepository)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => httpMock.verify())

  it('getAll GETs and maps to entities', () => {
    let result: unknown
    repo.getAll().subscribe((r) => (result = r))
    const req = httpMock.expectOne(`${base}GetAllVideos`)
    expect(req.request.method).toBe('GET')
    req.flush(apiOk([videoResponseDtoMock]))
    expect(result).toEqual([videoMock])
  })

  it('add POSTs the request DTO with videoId 0', () => {
    repo
      .add({ url: 'u', title: 't', description: 'd', thumbnail: 'th', duration: '60' })
      .subscribe()
    const req = httpMock.expectOne(`${base}AddNewVideo`)
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toMatchObject({ videoId: 0, videoTitle: 't', totalDuration: '60' })
    req.flush(apiOk(videoResponseDtoMock))
  })

  it('update PUTs reusing the id', () => {
    repo
      .update(100, { url: 'u', title: 't', description: 'd', thumbnail: 'th', duration: '60' })
      .subscribe()
    const req = httpMock.expectOne(`${base}UpdateVideo`)
    expect(req.request.method).toBe('PUT')
    expect(req.request.body).toMatchObject({ videoId: 100 })
    req.flush(apiOk(videoResponseDtoMock))
  })

  it('delete sends videoId as query param', () => {
    repo.delete(100).subscribe()
    const req = httpMock.expectOne(`${base}DeleteVideo?videoId=100`)
    expect(req.request.method).toBe('DELETE')
    req.flush(apiOk(null))
  })
})
