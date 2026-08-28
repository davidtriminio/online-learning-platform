import { ProgressResponseDto } from '../../features/progress/infrastructure/dto/progress-response.dto'

export const progressResponseDtoMock: ProgressResponseDto = {
  progressId: 21,
  enrollmentId: 11,
  videoId: 100,
  isStarted: true,
  isCompleted: true,
  startedDate: '2026-02-11T00:00:00.000Z',
  completedDate: '2026-02-12T00:00:00.000Z',
}

export const progressListDtoMock: ProgressResponseDto[] = [
  progressResponseDtoMock,
  {
    progressId: 22,
    enrollmentId: 11,
    videoId: 200,
    isStarted: true,
    isCompleted: false,
    startedDate: '2026-02-13T00:00:00.000Z',
    completedDate: '',
  },
]
