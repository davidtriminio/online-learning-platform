import { CourseResponseDto } from '../dto/course-response.dto';
import { Course } from '../../domain/course.model';

export function toCourse(dto: CourseResponseDto): Course{
  return {
    id: dto.courseId,
    name: dto.courseName,
    description: dto.courseDescription,
    totalHours: Number(dto.totalHours),
    totalVideos: dto.totalVideos,
    thumbnailUrl: dto.thumbnailUrl,
    createdDate: new Date(dto.createdDate)
  }
}
