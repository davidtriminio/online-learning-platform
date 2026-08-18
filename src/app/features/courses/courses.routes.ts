import { Routes } from '@angular/router';

export const coursesRoutes: Routes = [
  {path: '', loadComponent: () => import('./ui/pages/course-list/course-list.page').then(m => m.CourseListPage)}
]
