import { Directive, ElementRef, effect, inject, input } from '@angular/core'

@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef)

  readonly text = input.required<string>({ alias: 'appHighlight' })
  readonly term = input('', {
    alias: 'appHighlightTerm',
    transform: (v: string | undefined) => v ?? '',
  })

  constructor() {
    // re-renderiza cuando cambia el texto o el término
    effect(() => {
      this.el.nativeElement.innerHTML = this.render(this.text(), this.term())
    })
  }

  private render(text: string, term: string): string {
    const t = term.trim()
    if (!t) return this.escape(text)

    const re = new RegExp(`(${this.escapeRegExp(t)})`, 'ig')
    // split con grupo de captura: los matches quedan en índices impares
    return text
      .split(re)
      .map((part, i) => (i % 2 === 1 ? `<mark>${this.escape(part)}</mark>` : this.escape(part)))
      .join('')
  }

  private escape(s: string): string {
    return s.replace(
      /[&<>"']/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
    )
  }

  private escapeRegExp(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }
}
