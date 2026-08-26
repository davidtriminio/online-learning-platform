import { describe, it, expect } from 'vitest'
import { Component, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { HighlightDirective } from './highlight.directive'

@Component({
  imports: [HighlightDirective],
  template: `<span [appHighlight]="text()" [appHighlightTerm]="term()"></span>`,
})
class Host {
  text = signal('Learn Angular')
  term = signal('')
}

describe('HighlightDirective', () => {
  function setup() {
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    const span = fixture.nativeElement.querySelector('span') as HTMLElement
    return { fixture, span }
  }

  it('renders plain escaped text when term is empty', () => {
    const { span } = setup()
    expect(span.innerHTML).toBe('Learn Angular')
  })

  it('wraps the match in <mark> (case-insensitive)', () => {
    const { fixture, span } = setup()
    fixture.componentInstance.term.set('angular')
    fixture.detectChanges()
    expect(span.innerHTML).toBe('Learn <mark>Angular</mark>')
  })

  it('escapes HTML in the source text', () => {
    const { fixture, span } = setup()
    fixture.componentInstance.text.set('<img src=x>')
    fixture.detectChanges()
    expect(span.innerHTML).toBe('&lt;img src=x&gt;')
  })
})
