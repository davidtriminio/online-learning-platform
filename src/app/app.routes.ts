import { Routes } from '@angular/router'
import { authGuard } from './features/auth/infrastructure/auth.guard'
import { MainLayout } from './layout/main-layout/main-layout'

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'courses',
        loadChildren: () =>
          import('./features/courses/courses.routes').then((m) => m.coursesRoutes),
      },
      {
        path: 'videos',
        loadChildren: () => import('./features/videos/videos.routes').then((m) => m.videosRoutes),
      },
      {
        path: 'my-courses',
        loadChildren: () =>
          import('./features/enrollments/enrollments.routes').then((m) => m.enrollmentsRoutes),
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./features/favorites/favorites.routes').then((m) => m.FavoritesRoutes),
      },
      {
        path: '',
        redirectTo: 'courses',
        pathMatch: 'full',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./shared/ui/not-found/not-found.page').then((m) => m.NotFoundPage),
      },
    ],
  },
]
