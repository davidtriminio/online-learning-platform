import { required, schema } from '@angular/forms/signals';

export interface LoginForm {
  userName: string
  password: string
}

export const loginSchema = schema<LoginForm>((path) => {
  required(path.userName, {message: 'User name is required'})
  required(path.password, {message: 'Password name is required'})
})
