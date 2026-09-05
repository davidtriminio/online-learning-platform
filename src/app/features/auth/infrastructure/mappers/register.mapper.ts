import { RegisterRequestDto } from '../dto/register-request.dto'
import { RegisterForm } from '../../application/register.schema'

const PROJECT_NAME = 'LMS'

export function toRegisterRequestDto(form: RegisterForm): RegisterRequestDto {
  const now = new Date().toISOString()
  return {
    userId: 0,
    userName: form.userName,
    emailId: form.emailId,
    fullName: form.fullName,
    role: '',
    createdDate: now,
    password: form.password,
    projectName: PROJECT_NAME,
    refreshToken: '',
    refreshTokenExpiryTime: now,
  }
}
