import { Routes } from '@angular/router'

export const coursesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/pages/course-list/course-list.page').then((m) => m.CourseListPage),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./ui/pages/course-form/course-form.page').then((m) => m.CourseFormPage),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./ui/pages/course-detail/course-detail.page').then((m) => m.CourseDetailPage),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./ui/pages/course-form/course-form.page').then((m) => m.CourseFormPage),
  },
]
