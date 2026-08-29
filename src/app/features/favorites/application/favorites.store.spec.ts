import { expect, beforeEach, afterEach } from 'vitest'
import { TestBed } from '@angular/core/testing'
import { signal } from '@angular/core'
import { provideHttpClient } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { FavoritesStore } from './favorites.store'
import { AuthStore } from '../../auth/application/auth.store'
import { environment } from '../../../../environments/environment'
import { apiOk } from '../../../testing/mocks/api-response.mock'
import { courseListDtoMock } from '../../../testing/mocks/courses.mock'

describe('FavoritesStore', () => {
  let store: FavoritesStore
  let httpMock: HttpTestingController
  const userSig = signal<any>({ id: 7 })

  beforeEach(() => {
    localStorage.clear()
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthStore, useValue: { user: userSig.asReadonly() } },
      ],
    })
    store = TestBed.inject(FavoritesStore) //  CoursesStore instance → onInit GET
    httpMock = TestBed.inject(HttpTestingController)
    httpMock.expectOne(`${environment.apiUrl}GetAllCourse`).flush(apiOk(courseListDtoMock))
    TestBed.tick() // clears the hydration effect (empty storage → empty IDs)
  })

  afterEach(() => httpMock.verify())

  it('toggles a favorite on and off', () => {
    store.toggle(3)
    expect(store.isFavorite(3)).toBe(true)
    expect(store.count()).toBe(1)
    store.toggle(3)
    expect(store.isFavorite(3)).toBe(false)
  })

  it('derives favoriteCourses by crossing the catalog', () => {
    store.toggle(3)
    expect(store.favoriteCourses().map((c) => c.name)).toEqual(['Angular Fundamentals'])
  })

  it('persists to the user-namespaced storage key', () => {
    store.toggle(3)
    expect(localStorage.getItem('ol.favorites.7')).toBe('[3]')
  })
})
