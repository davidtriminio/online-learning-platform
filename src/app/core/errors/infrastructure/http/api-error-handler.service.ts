import { Injectable } from '@angular/core'
import {HttpErrorResponse} from '@angular/common/http'

import { AppError } from '../../domain/app-error'

@Injectable({
  providedIn: 'root'
})
export class ApiErrorHandlerService {
  normalize(error: HttpErrorResponse) : AppError{
    return {
      status: error.status,
      message: this.getMessage(error),
      code: this.getCode(error),
      details: error.error
    }
  }

  private getMessage(error: HttpErrorResponse) : string {
    switch (error.status) {
      case 0:
        return 'Unable to connect to the server.'

      case 400:
        return 'Bad request.'

      case 401:
        return 'Unauthorized.'

      case 403:
        return 'Forbidden.'

      case 404:
        return 'Resource not found.'

      case 409:
        return 'Conflict.'

      case 422:
        return 'Validation error.'

      case 500:
        return 'Internal server error.'

      default:
        return 'An unexpected error occurred.'
    }
  }

  private getCode(error : HttpErrorResponse): string | undefined {
    if (
      typeof error.error === 'object' &&
      error.error !== null &&
      'code' in error.error &&
      typeof error.error.code === 'string'
    ){
      return error.error.code
    }
    return undefined
  }
}
