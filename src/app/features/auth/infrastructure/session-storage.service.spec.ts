import { expect, beforeEach } from 'vitest'
import { SessionStorageService } from './session-storage.service'
import { AuthUser } from '../domain/auth-user.model'

describe('SessionStorageService', () => {
  let service: SessionStorageService

  const user: AuthUser = {
    id: 7,
    userName: 'john',
    email: 'john@olp.dev',
    fullName: 'John Doe',
    role: 'Admin',
    projectName: 'OnlineLearning',
    createdDate: new Date('2026-01-15T10:30:00.000Z'),
  }

  beforeEach(() => {
    localStorage.clear()
    service = new SessionStorageService()
  })

  it('round-trips the token', () => {
    service.setToken('tok-abc')
    expect(service.getToken()).toBe('tok-abc')
  })

  it('rehydrates createdDate to a Date on read', () => {
    service.setUser(user)
    const got = service.getUser()
    expect(got?.createdDate).toBeInstanceOf(Date)
    expect(got?.createdDate.getTime()).toBe(user.createdDate.getTime())
  })

  it('returns null when there is no user', () => {
    expect(service.getUser()).toBeNull()
  })

  it('recovers from corrupted user JSON', () => {
    localStorage.setItem('ol.session.user', '{bad')
    expect(service.getUser()).toBeNull()
  })

  it('clear wipes token and user', () => {
    service.setToken('t')
    service.setUser(user)
    service.clear()
    expect(service.getToken()).toBeNull()
    expect(service.getUser()).toBeNull()
  })
})
