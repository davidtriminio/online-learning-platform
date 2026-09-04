import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { routes } from './app.routes'
import { authInterceptor } from './features/auth/infrastructure/auth.interceptor'
import { apiErrorInterceptor } from './core/http/api-error-interceptor'
import { loadingInterceptor } from './core/loading/loading-interceptor'
import {
  provideClientHydration,
  withEventReplay,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(withInterceptors([apiErrorInterceptor, loadingInterceptor, authInterceptor])),
    provideClientHydration(
      withEventReplay(),
      withHttpTransferCacheOptions({
        includePostRequests: false,
        includeRequestsWithAuthHeaders: false,
        filter: (req) =>
          req.method === 'GET' && !req.params.has('userid') && !req.params.has('enrollmentId'),
      }),
    ),
  ],
}
