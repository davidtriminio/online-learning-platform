import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { LoadingStore } from './loading.store'
import { finalize } from 'rxjs'

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingStore)
  loading.start()
  return next(req).pipe(finalize(() => loading.stop()))
}
