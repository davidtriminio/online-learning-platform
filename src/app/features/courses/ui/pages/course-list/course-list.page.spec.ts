import { afterEach, beforeEach, describe, expect } from 'vitest'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { environment } from '../../../../../../environments/environment'
import { apiOk } from '../../../../../testing/mocks/api-response.mock'
import { courseListDtoMock } from '../../../../../testing/mocks/courses.mock'
import { CourseListPage } from './course-list.page'
import { TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideRouter } from '@angular/router'

describe('CourseListPage', () => {
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CourseListPage],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    })
  })

  afterEach(() => httpMock.verify())

  function setup() {
    const fixture = TestBed.createComponent(CourseListPage)
    httpMock = TestBed.inject(HttpTestingController)
    httpMock.expectOne(`${environment.apiUrl}GetAllCourse`).flush(apiOk(courseListDtoMock))
    fixture.detectChanges()
    return fixture
  }

  it('renders one card per course', () => {
    const fixture = setup()
    const cards = fixture.nativeElement.querySelectorAll('app-course-card')
    expect(cards.length).toBe(3)
  })

  it('filters the grid from the ?q Router Input', () => {
    const fixture = setup()
    fixture.componentRef.setInput('q', 'python')
    fixture.detectChanges()
    const cards = fixture.nativeElement.querySelectorAll('app-course-card')
    expect(cards.length).toBe(1)
  })
})
