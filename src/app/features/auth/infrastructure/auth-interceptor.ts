import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { SessionStorageService } from './session-storage-service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(SessionStorageService).getToken()
  if (!token) return next(req)
  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }))
}
