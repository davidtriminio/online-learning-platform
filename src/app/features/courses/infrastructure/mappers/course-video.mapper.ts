import { CourseVideoResponseDto } from '../dto/course-video-response.dto'
import { CourseVideo } from '../../domain/course-video.model'

export function toCourseVideo(dto: CourseVideoResponseDto): CourseVideo {
  return {
    courseVideoId: dto.courseVideoId,
    courseId: dto.courseId,
    courseName: dto.courseName,
    videoId: dto.videoId,
    videoTitle: dto.videoTitle,
    videoUrl: dto.videoUrl,
  }
}
