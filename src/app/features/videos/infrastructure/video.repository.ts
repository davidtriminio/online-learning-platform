import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment'
import { map, Observable } from 'rxjs'
import { Video, VideoInput } from '../domain/video.model'
import { ApiResponse } from '../../../core/http/api-response.model'
import { VideoResponseDto } from './dto/video-response.dto'
import { VIDEO_ENDPOINTS } from '../../../core/endpoints'
import { toVideo, toVideoRequestDto } from './mappers/video.mapper'

@Injectable({ providedIn: 'root' })
export class VideoRepository {
  private http = inject(HttpClient)
  private baseUrl = environment.apiUrl

  getAll(): Observable<Video[]> {
    return this.http
      .get<ApiResponse<VideoResponseDto[]>>(`${this.baseUrl}${VIDEO_ENDPOINTS.getAll}`)
      .pipe(map((res) => res.data.map(toVideo)))
  }

  add(input: VideoInput): Observable<Video> {
    return this.http
      .post<ApiResponse<VideoResponseDto>>(
        `${this.baseUrl}${VIDEO_ENDPOINTS.add}`,
        toVideoRequestDto(input),
      )
      .pipe(map((res) => toVideo(res.data)))
  }

  update(id: number, input: VideoInput): Observable<Video> {
    return this.http
      .put<ApiResponse<VideoResponseDto>>(
        `${this.baseUrl}${VIDEO_ENDPOINTS.update}`,
        toVideoRequestDto(input, id),
      )
      .pipe(map((res) => toVideo(res.data)))
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<ApiResponse<null>>(`${this.baseUrl}${VIDEO_ENDPOINTS.delete}?videoId=${id}`)
      .pipe(map(() => undefined))
  }
}
