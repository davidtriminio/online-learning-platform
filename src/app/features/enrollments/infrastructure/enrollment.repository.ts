import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment'
import { map, Observable } from 'rxjs'
import { Enrollment, EnrollmentInput } from '../domain/enrollment.model'
import { ApiResponse } from '../../../core/http/api-response.model'
import { EnrollmentResponseDto } from './dto/enrollment-response.dto'
import { ENROLLMENTS_ENDPOINTS } from '../../../core/endpoints/enrollments.endpoints'
import { toCreateEnrollmentRequestDto, toEnrollment } from './mappers/enrollment.mapper'

@Injectable({ providedIn: 'root' })
export class EnrollmentRepository {
  private http = inject(HttpClient)
  private baseUrl = environment.apiUrl

  getByUserId(userId: number): Observable<Enrollment[]> {
    return this.http
      .get<ApiResponse<EnrollmentResponseDto[]>>(
        `${this.baseUrl}${ENROLLMENTS_ENDPOINTS.getByUserId}?userid=${userId}`,
      )
      .pipe(map((res) => res.data.map(toEnrollment)))
  }

  create(input: EnrollmentInput): Observable<Enrollment> {
    return this.http
      .post<ApiResponse<EnrollmentResponseDto>>(
        `${this.baseUrl}${ENROLLMENTS_ENDPOINTS.create}`,
        toCreateEnrollmentRequestDto(input),
      )
      .pipe(map((res) => toEnrollment(res.data)))
  }

  delete(enrollmentId: number): Observable<void> {
    return this.http
      .delete<ApiResponse<null>>(
        `${this.baseUrl}${ENROLLMENTS_ENDPOINTS.delete}?enrollmentId=${enrollmentId}`,
      )
      .pipe(map(() => undefined))
  }
}
