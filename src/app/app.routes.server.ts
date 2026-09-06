import { RenderMode, ServerRoute } from '@angular/ssr'

export const serverRoutes: ServerRoute[] = [
  { path: 'login', renderMode: RenderMode.Prerender },
  { path: 'register', renderMode: RenderMode.Prerender },
  { path: 'demo', renderMode: RenderMode.Client },
  { path: 'my-courses', renderMode: RenderMode.Client },
  { path: 'favorites', renderMode: RenderMode.Client },
  { path: 'videos', renderMode: RenderMode.Client },
  { path: 'courses', renderMode: RenderMode.Server },
  { path: 'courses/:id', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server },
]
