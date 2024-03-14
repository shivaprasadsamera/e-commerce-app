import { CanActivateFn, Router,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean => {
  const userAuthService = inject(UserAuthService);
  const router = inject(Router);
  const userService = inject(UserService);

  const token = userAuthService.getToken();

  if (token != null) {
    const role = route.data['roles'] as Array<string>;
    if (role) {
      const match = userService.roleMatch(role);
      if (match) {
        return true;
      } else {
        router.navigate(['/forbidden']);
        return false;
      }
    }
  }

  router.navigate(['/login']);

  return false;
};
