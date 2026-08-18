import { Injectable } from '@angular/core'

const TOKEN_KEY = 'ol.session.token'

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  getToken(): string | null {
    try { return localStorage.getItem(TOKEN_KEY) } catch { return null }
  }
  setToken(token: string): void {
    try { localStorage.setItem(TOKEN_KEY, token) } catch {}
  }
  clear(): void {
    try { localStorage.removeItem(TOKEN_KEY) } catch {}
  }
}
