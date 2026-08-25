import { Routes } from '@angular/router'

export const FavoritesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/pages/favorites/favorites.page').then((m) => m.FavoritesPage),
  },
]
