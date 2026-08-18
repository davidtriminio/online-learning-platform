import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiErrorHandlerService } from '../errors/application/http/api-error-handler.service';
import { catchError, throwError } from 'rxjs';
import { AppError } from '../errors/domain/app-error';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const handler = inject(ApiErrorHandlerService)
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const appError: AppError = handler.normalize(error)
      return throwError(()=> appError)
    })
  )
};
