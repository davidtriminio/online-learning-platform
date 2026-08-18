import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {path: '', loadComponent: () => import('./ui/pages/login/login.page').then(m => m.LoginPage)}
]
