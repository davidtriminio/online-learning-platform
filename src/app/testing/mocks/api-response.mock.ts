import { ApiResponse } from '../../core/http/api-response.model'

export const apiOk = <T>(data: T): ApiResponse<T> => ({
  message: 'OK',
    result: true,
    data
})
