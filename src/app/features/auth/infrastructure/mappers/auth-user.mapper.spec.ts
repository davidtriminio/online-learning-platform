import { toAuthUser } from './auth-user.mapper'
import { userResponseDtoMock } from './../../../../testing/mocks/auth.mock'
import { expect } from 'vitest'

describe('toAuthUser', () => {
  it('maps DTO fields to the AuthUser entity', () => {
    const user = toAuthUser(userResponseDtoMock)
    expect(user).toEqual({
      id: 7,
      userName: 'john',
      email: 'john@olp.dev',
      fullName: 'John Doe',
      role: 'Admin',
      projectName: 'OnlineLearning',
      createdDate: new Date('2026-01-15T10:30:00.000Z'),
    })
  })

  it('discards the password (never reaches the domain)', () => {
    const user = toAuthUser(userResponseDtoMock)
    expect('password' in user).toBe(false)
  })

  it('does not leak tokens into the entity', () => {
    const user = toAuthUser(userResponseDtoMock)
    expect('refreshToken' in user).toBe(false)
    expect('refreshTokenExpiryTime' in user).toBe(false)
  })

  it('converts createdDate to a Date instance', () => {
    const user = toAuthUser(userResponseDtoMock)
    expect(user.createdDate).toBeInstanceOf(Date)
  })
})
