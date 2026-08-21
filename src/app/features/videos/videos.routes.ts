import { Routes } from '@angular/router'

export const videosRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/pages/video-list/video-list.page').then((m) => m.VideoListPage),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./ui/pages/video-form/video-form.page').then((m) => m.VideoFormPage),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./ui/pages/video-form/video-form.page').then((m) => m.VideoFormPage),
  },
]
