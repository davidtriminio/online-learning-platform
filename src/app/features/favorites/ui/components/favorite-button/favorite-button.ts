import { Component, computed, inject, input } from '@angular/core'
import { FavoritesStore } from '../../../application/favorites.store'
import { LucideHeart } from '@lucide/angular'
import { Button } from '../../../../../shared/ui/button/button/button'

@Component({
  selector: 'app-favorite-button',
  imports: [LucideHeart, Button],
  templateUrl: './favorite-button.html',
})
export class FavoriteButton {
  private readonly favorites = inject(FavoritesStore)
  readonly courseId = input.required<number>()

  protected readonly isFavorite = computed(() => this.favorites.isFavorite(this.courseId()))

  protected toggle(event: Event): void {
    event.stopPropagation()
    event.preventDefault()
    this.favorites.toggle(this.courseId())
  }
}
