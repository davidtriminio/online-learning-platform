import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Course, CourseInput } from '../domain/course.model';
import { ApiResponse } from '../../../core/http/api-response.model';
import { CourseResponseDto } from './dto/course-response.dto';
import { COURSE_ENDPOINTS } from '../../../core/endpoints';
import { toCourse, toCourseRequestDto } from './mappers/course.mapper';

@Injectable({ providedIn: 'root' })
export class CourseRepository {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getAll(): Observable<Course[]> {
    return this.http
      .get<ApiResponse<CourseResponseDto[]>>(`${this.baseUrl}${COURSE_ENDPOINTS.getAll}`)
      .pipe(map((res) => res.data.map(toCourse)));
  }

  add(input: CourseInput): Observable<Course> {
    return this.http
      .post<ApiResponse<CourseResponseDto>>(
        `${this.baseUrl}${COURSE_ENDPOINTS.add}`,
        toCourseRequestDto(input),
      )
      .pipe(map((res) => toCourse(res.data)));
  }

  update(base: Course, input: CourseInput): Observable<Course> {
    return this.http
      .put<ApiResponse<CourseResponseDto>>(
        `${this.baseUrl}${COURSE_ENDPOINTS.update}`,
        toCourseRequestDto(input, base),
      )
      .pipe(map((res) => toCourse(res.data)));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<ApiResponse<boolean>>(`${this.baseUrl}${COURSE_ENDPOINTS.deleteById}?Id=${id}`)
      .pipe(map(() => undefined));
  }
}
