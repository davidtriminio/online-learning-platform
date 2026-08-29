import { expect, beforeEach, afterEach } from 'vitest'
import { TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { AuthRepository } from './auth.repository'
import { environment } from '../../../../environments/environment'
import { apiOk } from '../../../testing/mocks/api-response.mock'
import { userResponseDtoMock } from '../../../testing/mocks/auth.mock'

describe('AuthRepository', () => {
  let repo: AuthRepository
  let httpMock: HttpTestingController
  const base = environment.apiUrl

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    repo = TestBed.inject(AuthRepository)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => httpMock.verify())

  it('POSTs credentials and returns a session', () => {
    let session: any
    repo.login({ userName: 'john', password: 'secret' }).subscribe((s) => (session = s))
    const req = httpMock.expectOne(`${base}login`)
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual({ userName: 'john', password: 'secret' })
    req.flush(apiOk(userResponseDtoMock))

    expect(session.user.id).toBe(7)
    expect(session.token).toBe('refresh-token-abc') // token = refreshToken
  })

  it('drops the password and never leaks it into the user entity', () => {
    let session: any
    repo.login({ userName: 'john', password: 'secret' }).subscribe((s) => (session = s))
    httpMock.expectOne(`${base}login`).flush(apiOk(userResponseDtoMock))
    expect('password' in session.user).toBe(false)
    expect('refreshToken' in session.user).toBe(false)
  })
})
