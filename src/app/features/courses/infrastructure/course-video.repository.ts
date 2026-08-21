import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment'
import { map, Observable } from 'rxjs'
import { ApiResponse } from '../../../core/http/api-response.model'
import { CourseVideoResponseDto } from './dto/course-video-response.dto'
import { COURSE_VIDEO_ENDPOINTS } from '../../../core/endpoints'
import { toCourseVideo } from './mappers/course-video.mapper'
import { CourseVideo } from '../domain/course-video.model'

@Injectable({ providedIn: 'root' })
export class CourseVideoRepository {
  private http = inject(HttpClient)
  private baseUrl = environment.apiUrl

  byCourseId(courseId: number): Observable<CourseVideo[]> {
    return this.http
      .get<ApiResponse<CourseVideoResponseDto[]>>(
        `${this.baseUrl}${COURSE_VIDEO_ENDPOINTS.byCourseId}?courseId=${courseId}`,
      )
      .pipe(map((res) => res.data.map(toCourseVideo)))
  }

  addToCourse(courseId: number, videoId: number): Observable<void> {
    return this.http
      .post<ApiResponse<unknown>>(`${this.baseUrl}${COURSE_VIDEO_ENDPOINTS.add}`, {
        courseId,
        videoId,
      })
      .pipe(map(() => undefined))
  }

  removerFromCourse(courseVideoId: number): Observable<void> {
    return this.http
      .delete(
        `${this.baseUrl}${COURSE_VIDEO_ENDPOINTS.removeFromCourse}?courseVideoId=${courseVideoId}`,
      )
      .pipe(map(() => undefined))
  }
}
