import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizeService } from '../../../services/authorization/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthorizeService);
  const router = inject(Router);

  if (authService.isTokenPresent()) {
    return true;
  } else {
    router.navigate(['login']);
    localStorage.clear();
    return false;
  }

};
