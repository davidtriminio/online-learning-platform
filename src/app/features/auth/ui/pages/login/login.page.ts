import { Component, inject, signal } from '@angular/core'
import { AuthStore } from '../../../application/auth.store'
import { form, FormField, required } from '@angular/forms/signals'
import { LucideArrowRight, LucideCircleAlert, LucideLoaderCircle, LucideLock, LucideSparkles, LucideUser } from '@lucide/angular'

@Component({
  selector: 'app-login',
  imports: [
    FormField,
    LucideSparkles,
    LucideCircleAlert,
    LucideUser,
    LucideLock,
    LucideLoaderCircle,
    LucideArrowRight,
  ],
  templateUrl: './login.page.html'
})
export class LoginPage {
  private authStore = inject(AuthStore)
  protected readonly status = this.authStore.status

  protected readonly model = signal({ userName: '', password: '' })
  protected readonly loginForm = form(this.model, (path) => {
    required(path.userName, { message: 'Username is required.' })
    required(path.password, { message: 'Password is required.' })
  })

  onSubmit(): void {

    // marcar como 'touched' para mostrar errores
    this.loginForm.userName().markAsTouched()
    this.loginForm.password().markAsTouched()

    // formulario invalido se detiene ejecución
    if (this.loginForm().invalid()) return

    // proceder al inicio de sesión, si el formulario está bien
    this.authStore.login(this.loginForm().value())
  }
}
