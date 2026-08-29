import { expect } from 'vitest'
import { TestBed } from '@angular/core/testing'
import { provideRouter, UrlTree } from '@angular/router'
import { authGuard } from './auth.guard'
import { AuthStore } from '../application/auth.store'

describe('authGuard', () => {
  const run = () => TestBed.runInInjectionContext(() => authGuard({} as any, {} as any))

  it('allows navigation when authenticated', () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthStore, useValue: { isAuthenticated: () => true } },
      ],
    })
    expect(run()).toBe(true)
  })

  it('redirects to /login when anonymous', () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthStore, useValue: { isAuthenticated: () => false } },
      ],
    })
    const result = run()
    expect(result).toBeInstanceOf(UrlTree)
    expect((result as UrlTree).toString()).toBe('/login')
  })
})
