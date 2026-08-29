import { expect, beforeEach } from 'vitest'
import { TestBed, ComponentFixture } from '@angular/core/testing'
import { Paginator } from './paginator'

describe('Paginator', () => {
  let fixture: ComponentFixture<Paginator>
  let emitted: number[]

  function setup(current: number, total: number) {
    fixture = TestBed.createComponent(Paginator)
    fixture.componentRef.setInput('currentPage', current)
    fixture.componentRef.setInput('totalPages', total)
    fixture.detectChanges()
    emitted = []
    fixture.componentInstance.pageChange.subscribe((n) => emitted.push(n))
  }

  beforeEach(() => TestBed.configureTestingModule({ imports: [Paginator] }))

  it('emits next but blocks prev on the first page', () => {
    setup(1, 3)
    ;(fixture.componentInstance as any).prev()
    ;(fixture.componentInstance as any).next()
    expect(emitted).toEqual([2])
  })

  it('emits prev but blocks next on the last page', () => {
    setup(3, 3)
    ;(fixture.componentInstance as any).next()
    ;(fixture.componentInstance as any).prev()
    expect(emitted).toEqual([2])
  })
})
