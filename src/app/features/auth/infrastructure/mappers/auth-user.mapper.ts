import { UserResponseDto } from '../dto/user-response.dto'
import { AuthUser } from '../../domain/auth-user.model'

export function toAuthUser(dto: UserResponseDto): AuthUser {
  return {
    id: dto.userId,
    userName: dto.userName,
    email: dto.emailId,
    fullName: dto.fullName,
    role: dto.role,
    projectName: dto.projectName,
    createdDate: new Date(dto.createdDate),
  }
}
