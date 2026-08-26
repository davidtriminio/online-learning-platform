import { Component, computed, input } from '@angular/core'
import { CardSkeleton } from '../card-skeleton/card-skeleton'

@Component({
  selector: 'app-skeleton-grid',
  imports: [CardSkeleton],
  templateUrl: './skeleton-grid.html',
})
export class SkeletonGrid {
  readonly count = input(6)
  protected readonly items = computed(() => Array.from({ length: this.count() }))
}
