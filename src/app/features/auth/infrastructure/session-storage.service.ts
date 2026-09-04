import { inject, Injectable, PLATFORM_ID } from '@angular/core'
import { AuthUser } from '../domain/auth-user.model'
import { isPlatformBrowser } from '@angular/common'

const TOKEN_KEY = 'ol.session.token'
const USER_KEY = 'ol.session.user'

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID))

  getToken(): string | null {
    if (!this.isBrowser) return null
    try {
      return localStorage.getItem(TOKEN_KEY)
    } catch {
      return null
    }
  }
  setToken(token: string): void {
    if (!this.isBrowser) return
    try {
      localStorage.setItem(TOKEN_KEY, token)
    } catch {}
  }

  getUser(): AuthUser | null {
    if (!this.isBrowser) return null
    try {
      const raw = localStorage.getItem(USER_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      return { ...parsed, createdDate: new Date(parsed.createdDate) }
    } catch {
      return null
    }
  }

  setUser(user: AuthUser | null): void {
    if (!this.isBrowser) return
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } catch {}
  }

  clear(): void {
    if (!this.isBrowser) return
    try {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    } catch {}
  }
}
