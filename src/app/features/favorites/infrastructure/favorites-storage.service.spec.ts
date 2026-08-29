import { beforeEach, describe, expect } from 'vitest'
import { FavoritesStorageService } from './favorites-storage.service'

describe('FavoritesStorageService', () => {
  let service: FavoritesStorageService

  beforeEach(() => {
    localStorage.clear()
    service = new FavoritesStorageService()
  })

  it('round-trips a Set under the user-namespaced key', () => {
    service.save(7, new Set([1, 2, 3]))
    expect(localStorage.getItem('ol.favorites.7')).toBe('[1,2,3]')
    expect(service.load(7)).toEqual(new Set([1, 2, 3]))
  })

  it('isolates favorites per user', () => {
    service.save(7, new Set([1]))
    expect(service.load(8)).toEqual(new Set())
  })

  it('returns an empty Set for a null user (logged out)', () => {
    expect(service.load(null)).toEqual(new Set())
  })

  it('recovers from corrupted JSON instead of throwing', () => {
    localStorage.setItem('ol.favorites.7', '{not-json')
    expect(service.load(7)).toEqual(new Set())
  })
})
