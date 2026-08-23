import { ProgressResponseDto } from '../dto/progress-response.dto'
import { ProgressInput, VideoProgress } from '../../domain/video-progress.model'
import { ProgressRequestDto } from '../dto/progress-request.dto'

export function toVideoProgress(dto: ProgressResponseDto): VideoProgress {
  return {
    id: dto.progressId,
    enrollmentId: dto.enrollmentId,
    videoId: dto.videoId,
    isStarted: dto.isStarted,
    isCompleted: dto.isCompleted,
    startedDate: dto.startedDate ? new Date(dto.startedDate) : null,
    completedDate: dto.completedDate ? new Date(dto.completedDate) : null,
  }
}

export function toStartRequestDto(input: ProgressInput): ProgressRequestDto {
  const now = new Date().toISOString()
  return {
    progressId: 0,
    enrollmentId: input.enrollmentId,
    videoId: input.videoId,
    isStarted: true,
    isCompleted: false,
    startedDate: now,
    completedDate: now,
  }
}

export function toCompleteRequestDto(base: VideoProgress): ProgressRequestDto {
  return {
    progressId: base.id,
    enrollmentId: base.enrollmentId,
    videoId: base.videoId,
    isStarted: true,
    isCompleted: true,
    startedDate: (base.startedDate ?? new Date()).toISOString(),
    completedDate: new Date().toISOString(),
  }
}
