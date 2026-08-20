import { Component, input } from '@angular/core'
import { LucideHouse, LucideInbox } from '@lucide/angular'
import { RouterLink } from '@angular/router'
import { describe } from 'vitest'

@Component({
  selector: 'app-empty-state',
  imports: [LucideInbox, RouterLink, LucideHouse],
  templateUrl: './empty-state.html',
})
export class EmptyState {
  readonly title = input('Nothing here yet')
  readonly message = input('there is nothing here right now.')
  readonly actionLabel = input<string>()
  readonly actionLink = input<string | unknown[]>()
  protected readonly describe = describe
}
