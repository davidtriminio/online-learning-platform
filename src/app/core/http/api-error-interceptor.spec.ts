import { afterEach, beforeEach, describe, expect } from 'vitest'
import { apiErrorInterceptor } from './api-error-interceptor'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { AppError } from '../errors/domain/app-error'

describe('apiErrorInterceptor', () => {
  let http: HttpClient
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiErrorInterceptor])),
        provideHttpClientTesting(),
      ],
    })
    http = TestBed.inject(HttpClient)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => httpMock.verify())

  it('normalizes a 404 into an AppError with mapped message and code', () => {
    let err: AppError | undefined
    http.get('/x').subscribe({ next: () => {}, error: (e) => (err = e) })

    httpMock.expectOne('/x').flush({ code: 'NOT_FOUND' }, { status: 404, statusText: 'Not Found' })

    expect(err).toEqual({
      status: 404,
      message: 'Resource not found.',
      code: 'NOT_FOUND',
      details: { code: 'NOT_FOUND' },
    })
  })

  it('maps a network failure (status 0) to a connection message', () => {
    let err: AppError | undefined
    http.get('/x').subscribe({ next: () => {}, error: (e) => (err = e) })

    httpMock.expectOne('/x').error(new ProgressEvent('error'))

    expect(err?.status).toBe(0)
    expect(err?.message).toBe('Unable to connect to the server.')
  })
})
