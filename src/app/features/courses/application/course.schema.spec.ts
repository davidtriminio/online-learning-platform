import { expect } from 'vitest'
import { TestBed } from '@angular/core/testing'
import { form } from '@angular/forms/signals'
import { signal } from '@angular/core'
import { CourseForm, courseSchema } from './course.schema'

describe('courseSchema', () => {
  const make = (initial: CourseForm) =>
    TestBed.runInInjectionContext(() => form(signal(initial), courseSchema))

  const valid: CourseForm = { name: 'Ng', description: 'D', totalHours: 4, thumbnailUrl: 'x' }

  it('is valid when every field is filled and hours >= 1', () => {
    expect(make(valid)().invalid()).toBe(false)
  })

  it('flags required on empty name', () => {
    const f = make({ ...valid, name: '' })
    expect(
      f
        .name()
        .errors()
        .some((e) => e.kind === 'required'),
    ).toBe(true)
  })

  it('flags min when totalHours is below 1', () => {
    const f = make({ ...valid, totalHours: 0 })
    expect(
      f
        .totalHours()
        .errors()
        .some((e) => e.kind === 'min'),
    ).toBe(true)
  })
})
