import { expect } from 'vitest'
import { TestBed } from '@angular/core/testing'
import { form } from '@angular/forms/signals'
import { signal } from '@angular/core'
import { VideoForm, videoSchema } from './video.schema'

describe('videoSchema', () => {
  const make = (initial: VideoForm) =>
    TestBed.runInInjectionContext(() => form(signal(initial), videoSchema))

  const valid: VideoForm = { url: 'u', title: 't', description: '', thumbnail: '', duration: '' }

  it('is valid with only title and url (rest optional)', () => {
    expect(make(valid)().invalid()).toBe(false)
  })

  it('flags required on empty title', () => {
    const f = make({ ...valid, title: '' })
    expect(
      f
        .title()
        .errors()
        .some((e) => e.kind === 'required'),
    ).toBe(true)
  })

  it('flags required on empty url', () => {
    const f = make({ ...valid, url: '' })
    expect(
      f
        .url()
        .errors()
        .some((e) => e.kind === 'required'),
    ).toBe(true)
  })
})
