import { inject, Injectable, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

@Injectable({ providedIn: 'root' })
export class FavoritesStorageService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID))
  private key(userId: number): string {
    return `ol.favorites.${userId}`
  }

  load(userId: number | null): Set<number> {
    if (!this.isBrowser || userId == null) return new Set()
    try {
      const raw = localStorage.getItem(this.key(userId))
      if (!raw) return new Set()
      return new Set(JSON.parse(raw) as number[])
    } catch {
      return new Set()
    }
  }

  save(userId: number, ids: ReadonlySet<number>): void {
    if (!this.isBrowser) return
    try {
      localStorage.setItem(this.key(userId), JSON.stringify([...ids]))
    } catch {}
  }
}
