import { Component, computed, input, output } from '@angular/core'
import { LucideChevronLeft, LucideChevronRight } from '@lucide/angular'
import { Button } from '../button/button/button'

@Component({
  selector: 'app-paginator',
  imports: [LucideChevronLeft, LucideChevronRight, Button],
  templateUrl: './paginator.html',
})
export class Paginator {
  readonly currentPage = input.required<number>()
  readonly totalPages = input.required<number>()
  readonly pageChange = output<number>()

  protected readonly canPrev = computed(() => this.currentPage() > 1)
  protected readonly canNext = computed(() => this.currentPage() < this.totalPages())

  protected prev(): void {
    if (this.canPrev()) this.pageChange.emit(this.currentPage() - 1)
  }
  protected next(): void {
    if (this.canNext()) this.pageChange.emit(this.currentPage() + 1)
  }
}
