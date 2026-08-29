import { VideoResponseDto } from '../../features/videos/infrastructure/dto/video-response.dto'
import { Video } from '../../features/videos/domain/video.model'

export const videoResponseDtoMock: VideoResponseDto = {
  videoId: 100,
  videoUrl: 'https://youtu.be/abc',
  videoTitle: 'Intro',
  videoDescription: 'First lesson',
  videoThumbnail: 'https://cdn.olp.dev/thumb.png',
  videoDuration: '3600',
}

export const videoMock: Video = {
  id: 100,
  url: 'https://youtu.be/abc',
  title: 'Intro',
  description: 'First lesson',
  thumbnail: 'https://cdn.olp.dev/thumb.png',
  duration: '3600',
}

//20 vídeos (test pagination)
export const videoListDtoMock: VideoResponseDto[] = Array.from({ length: 20 }, (_, i) => ({
  videoId: i + 1,
  videoUrl: `https://youtu.be/v${i + 1}`,
  videoTitle: `Video ${i + 1}`,
  videoDescription: 'd',
  videoThumbnail: 't',
  videoDuration: '60',
}))
