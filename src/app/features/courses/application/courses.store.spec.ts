import { afterEach, beforeEach, describe, expect } from 'vitest'
import { environment } from '../../../../environments/environment'
import { CoursesStore } from './courses.store'
import { apiOk } from '../../../testing/mocks/api-response.mock'
import { courseListDtoMock } from '../../../testing/mocks/courses.mock'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'

describe('CoursesStore (filtering)', () => {
  let store: InstanceType<typeof CoursesStore>
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    //   inyectar el store dispara onInit → loadAll (GET)
    store = TestBed.inject(CoursesStore)
    httpMock = TestBed.inject(HttpTestingController)
    httpMock.expectOne(`${environment.apiUrl}GetAllCourse`).flush(apiOk(courseListDtoMock))
  })

  afterEach(() => httpMock.verify())

  it('returns all courses when the term is empty', () => {
    expect(store.filteredCourses().length).toBe(3)
    expect(store.hasSearch()).toBe(false)
  })

  it('filters accent-insensitively (F6)', () => {
    store.setSearchTerm('programacion') // sin tilde
    expect(store.filteredCourses().map((c) => c.name)).toEqual(['Programación en Python'])
    expect(store.hasSearch()).toBe(true)
  })

  it('matches on description too', () => {
    store.setSearchTerm('hooks')
    expect(store.filteredCourses().map((c) => c.name)).toEqual(['React Avanzado'])
  })
})
