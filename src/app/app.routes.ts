import { Routes } from '@angular/router'
import { authGuard } from './features/auth/infrastructure/auth.guard'
import { MainLayout } from './layout/main-layout/main-layout'

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/ui/pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'courses',
        loadChildren: () =>
          import('./features/courses/courses.routes').then((m) => m.coursesRoutes),
      },
      {
        path: 'videos',
        canActivate: [authGuard],
        loadChildren: () => import('./features/videos/videos.routes').then((m) => m.videosRoutes),
      },
      {
        path: 'my-courses',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/enrollments/enrollments.routes').then((m) => m.enrollmentsRoutes),
      },
      {
        path: 'favorites',
        canActivate: [authGuard],
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
