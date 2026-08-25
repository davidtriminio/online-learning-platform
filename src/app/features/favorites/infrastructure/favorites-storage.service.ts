import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class FavoritesStorageService {
  private key(userId: number): string {
    return `ol.favorites.${userId}`
  }

  load(userId: number | null): Set<number> {
    if (userId == null) return new Set()
    try {
      const raw = localStorage.getItem(this.key(userId))
      if (!raw) return new Set()
      const ids = JSON.parse(raw) as number[]
      return new Set(ids)
    } catch {
      return new Set()
    }
  }

  save(userId: number, ids: ReadonlySet<number>): void {
    try {
      localStorage.setItem(this.key(userId), JSON.stringify([...ids]))
    } catch {}
  }
}
