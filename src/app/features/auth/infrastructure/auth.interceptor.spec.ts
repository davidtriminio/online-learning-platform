import { expect, afterEach } from 'vitest'
import { TestBed } from '@angular/core/testing'
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { authInterceptor } from './auth.interceptor'
import { SessionStorageService } from './session-storage.service'

describe('authInterceptor', () => {
  function setup(token: string | null) {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: SessionStorageService, useValue: { getToken: () => token } },
      ],
    })
    return { http: TestBed.inject(HttpClient), httpMock: TestBed.inject(HttpTestingController) }
  }

  it('attaches the Bearer header when a token exists', () => {
    const { http, httpMock } = setup('tok-abc')
    http.get('/x').subscribe()
    const req = httpMock.expectOne('/x')
    expect(req.request.headers.get('Authorization')).toBe('Bearer tok-abc')
    req.flush({})
    httpMock.verify()
  })

  it('leaves the request untouched when there is no token', () => {
    const { http, httpMock } = setup(null)
    http.get('/x').subscribe()
    const req = httpMock.expectOne('/x')
    expect(req.request.headers.has('Authorization')).toBe(false)
    req.flush({})
    httpMock.verify()
  })
})
