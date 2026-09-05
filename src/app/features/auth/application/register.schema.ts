import { email, minLength, required, schema } from '@angular/forms/signals'

export interface RegisterForm {
  userName: string
  emailId: string
  fullName: string
  password: string
}

export const registerSchema = schema<RegisterForm>((path) => {
  required(path.userName, { message: 'User name is required' })
  required(path.fullName, { message: 'Full name is required' })
  required(path.emailId, { message: 'Email is required' })
  email(path.emailId, { message: 'Enter a valid email address' })
  required(path.password, { message: 'Password is required' })
  minLength(path.password, 6, { message: 'Min 6 characters' })
})
