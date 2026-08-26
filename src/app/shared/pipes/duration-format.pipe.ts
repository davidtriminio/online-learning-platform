import { Pipe, PipeTransform } from '@angular/core'

type DurationUnit = 'seconds' | 'hours'

@Pipe({
  name: 'durationFormat',
})
export class DurationFormatPipe implements PipeTransform {
  transform(value: number | string | null | undefined, unit: DurationUnit = 'seconds'): string {
    if (value == null || value === '') return ''

    const n = typeof value === 'string' ? Number(value) : value

    if (!Number.isFinite(n) || n < 0) return typeof value === 'string' ? value : ''

    const totalSeconds = unit === 'hours' ? Math.round(n * 3600) : Math.round(n)
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60

    const parts: String[] = []
    if (h) parts.push(`${h}h`)
    if (m) parts.push(`${m}m`)
    if (s && !h) parts.push(`${s}s`)

    return parts.length ? parts.join(' ') : unit === 'hours' ? '0m' : '0s'
  }
}
