import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from '../application/auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthStore)
  if (auth.isAuthenticated()) return true
  return inject(Router).createUrlTree(['/login'])
}
