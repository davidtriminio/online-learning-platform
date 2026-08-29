import { expect, beforeEach, afterEach } from 'vitest'
import { TestBed } from '@angular/core/testing'
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { loadingInterceptor } from './loading-interceptor'
import { LoadingStore } from './loading.store'

describe('loadingInterceptor', () => {
  let http: HttpClient
  let httpMock: HttpTestingController
  let loading: LoadingStore

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([loadingInterceptor])),
        provideHttpClientTesting(),
      ],
    })
    http = TestBed.inject(HttpClient)
    httpMock = TestBed.inject(HttpTestingController)
    loading = TestBed.inject(LoadingStore)
  })

  afterEach(() => httpMock.verify())

  it('starts on request and stops on success', () => {
    http.get('/x').subscribe()
    expect(loading.isLoading()).toBe(true)
    httpMock.expectOne('/x').flush({})
    expect(loading.isLoading()).toBe(false)
  })

  it('stops even when the request errors', () => {
    http.get('/y').subscribe({ error: () => {} })
    expect(loading.isLoading()).toBe(true)
    httpMock.expectOne('/y').flush(null, { status: 500, statusText: 'err' })
    expect(loading.isLoading()).toBe(false)
  })
})
