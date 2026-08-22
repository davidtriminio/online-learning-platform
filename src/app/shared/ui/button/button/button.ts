import { booleanAttribute, Component, input } from '@angular/core'
import { LucideLoaderCircle } from '@lucide/angular'

@Component({
  selector: 'button[appButton]',
  templateUrl: './button.html',
  imports: [LucideLoaderCircle],
  host: {
    '[disabled]': 'disabled() || loading()',
    '[attr.aria-busy]': 'loading()',
    class: 'cursor-pointer disabled:cursor-not-allowed',
  },
})
export class Button {
  readonly loading = input(false, { transform: booleanAttribute })
  readonly disabled = input(false, { transform: booleanAttribute })
}
