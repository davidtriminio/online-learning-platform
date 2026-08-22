import { Routes } from '@angular/router'

export const enrollmentsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/pages/my-courses/my-courses.page').then((m) => m.MyCoursesPage),
  },
]
