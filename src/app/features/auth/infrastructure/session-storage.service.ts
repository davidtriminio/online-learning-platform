import { Injectable } from '@angular/core'
import { AuthUser } from '../domain/auth-user.model'

const TOKEN_KEY = 'ol.session.token'
const USER_KEY = 'ol.session.user'

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY)
    } catch {
      return null
    }
  }
  setToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token)
    } catch {}
  }

  getUser(): AuthUser | null {
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
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } catch {}
  }

  clear(): void {
    try {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    } catch {}
  }
}
