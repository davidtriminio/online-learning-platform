import { Component, input, output } from '@angular/core'
import { LucideCircleAlert, LucideTrash2, LucideTriangleAlert } from '@lucide/angular'

@Component({
  selector: 'app-confirm-dialog',
  imports: [LucideTrash2, LucideTriangleAlert, LucideCircleAlert],
  templateUrl: './confirm-dialog.html',
})
export class ConfirmDialog {
  readonly open = input(false)
  readonly title = input('Are you sure?')
  readonly message = input('')
  readonly confirmLabel = input('Confirm')
  readonly cancelLabel = input('Cancel')
  readonly loading = input(false)
  readonly error = input<string | null>(null)

  readonly confirm = output<void>()
  readonly cancel = output<void>()
}
