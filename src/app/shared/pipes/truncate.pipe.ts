import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'truncatePipe',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, limit = 120, ellipsis = '…'): string {
    if (!value) return ''
    const text = value.trim()
    if (text.length <= limit) return text

    const slice = text.slice(0, limit)
    const lastSpace = slice.lastIndexOf(' ')

    //   short last space
    return (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).trimEnd() + ellipsis
  }
}
