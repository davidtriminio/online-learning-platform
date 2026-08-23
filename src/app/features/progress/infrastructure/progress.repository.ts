import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment'
import { map, Observable } from 'rxjs'
import { ProgressInput, VideoProgress } from '../domain/video-progress.model'
import { ApiResponse } from '../../../core/http/api-response.model'
import { ProgressResponseDto } from './dto/progress-response.dto'
import { PROGRESS_ENDPOINTS } from '../../../core/endpoints'
import { toCompleteRequestDto, toVideoProgress } from './mappers/progress.mapper'
import { toVideo } from '../../videos/infrastructure/mappers/video.mapper'

@Injectable({ providedIn: 'root' })
export class ProgressRepository {
  private http = inject(HttpClient)
  private baseUrl = environment.apiUrl

  getByEnrollmentId(enrollmentId: number): Observable<VideoProgress[]> {
    return this.http
      .get<ApiResponse<ProgressResponseDto[]>>(
        `${this.baseUrl}${PROGRESS_ENDPOINTS.getByEnrollmentId}?enrollmentId=${enrollmentId}`,
      )
      .pipe(map((res) => res.data.map(toVideoProgress)))
  }

  start(input: ProgressInput): Observable<VideoProgress> {
    return this.http
      .post<ApiResponse<ProgressResponseDto>>(`${this.baseUrl}${PROGRESS_ENDPOINTS.start}`, input)
      .pipe(map((res) => toVideoProgress(res.data)))
  }

  complete(base: VideoProgress): Observable<VideoProgress> {
    return this.http
      .post<ApiResponse<ProgressResponseDto>>(
        `${this.baseUrl}${PROGRESS_ENDPOINTS.complete}`,
        toCompleteRequestDto(base),
      )
      .pipe(map((res) => toVideoProgress(res.data)))
  }
}
