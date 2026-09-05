import { Component, inject, signal } from '@angular/core'
import { AuthStore } from '../../../application/auth.store'
import { form, FormField } from '@angular/forms/signals'
import { registerSchema } from '../../../application/register.schema'
import { LucideCircleAlert, LucideSparkles } from '@lucide/angular'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-register',
  imports: [LucideSparkles, LucideCircleAlert, FormField, RouterLink],
  templateUrl: './register.page.html',
})
export class RegisterPage {
  private authStore = inject(AuthStore)
  protected readonly status = this.authStore.status

  protected readonly model = signal({ userName: '', emailId: '', fullName: '', password: '' })
  protected readonly registerForm = form(this.model, registerSchema)

  onSubmit(): void {
    this.registerForm.userName().markAsTouched()
    this.registerForm.emailId().markAsTouched()
    this.registerForm.fullName().markAsTouched()
    this.registerForm.password().markAsTouched()
    if (this.registerForm().invalid()) return
    this.authStore.register(this.registerForm().value())
  }
}
