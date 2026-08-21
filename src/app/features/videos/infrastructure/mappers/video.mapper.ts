import { VideoResponseDto } from '../dto/video-response.dto'
import { Video, VideoInput } from '../../domain/video.model'
import { VideoRequestDto } from '../dto/video-request.dto'

export function toVideo(dto: VideoResponseDto): Video {
  return {
    id: dto.videoId,
    url: dto.videoUrl,
    title: dto.videoTitle,
    description: dto.videoDescription,
    thumbnail: dto.videoThumbnail,
    duration: dto.videoDuration,
  }
}

export function toVideoRequestDto(input: VideoInput, id = 0): VideoRequestDto {
  return {
    videoId: id,
    videoUrl: input.url,
    videoTitle: input.title,
    videoDescription: input.description,
    videoThumbnail: input.thumbnail,
    totalDuration: input.duration,
  }
}
