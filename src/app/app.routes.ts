import { Routes } from '@angular/router';
import { authGuard } from './features/auth/infrastructure/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'courses',
    canActivate: [authGuard],
    loadChildren: () => import('./features/courses/courses.routes').then((m) => m.coursesRoutes),
  },
  // {
  //   path: 'courses',
  //   canActivate: [authGuard],
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
