import { AuthUser } from '../domain/auth-user.model'
import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { LoginRequestDto } from './dto/login-request.dto'
import { map, Observable } from 'rxjs'
import { ApiResponse } from '../../../core/http/api-response.model'
import { UserResponseDto } from './dto/user-response.dto'
import { toAuthUser } from './mappers/auth-user.mapper'
import { AUTH_ENDPOINTS } from '../../../core/endpoints'
import { environment } from '../../../../environments/environment'

export interface AuthSession{
  user: AuthUser
  token: string
}

@Injectable({providedIn: 'root'})
export class AuthRepository{
  private http = inject(HttpClient)
  private baseUrl = environment.apiUrl

  login(credentials: LoginRequestDto): Observable<AuthSession>{
    return this.http
    .post<ApiResponse<UserResponseDto>>(`${this.baseUrl}${AUTH_ENDPOINTS.login}`, credentials)
    .pipe(map(res => ({
      user: toAuthUser(res.data),
      token: res.data.refreshToken
    })))
  }
}
