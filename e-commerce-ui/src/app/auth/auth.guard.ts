import { CanActivateFn, Router } from '@angular/router';
import { Injector } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const injector = Injector.create({ providers: [] });

  const userAuthService = injector.get(UserAuthService);
  const router = injector.get(Router);
  const userService = injector.get(UserService);

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
