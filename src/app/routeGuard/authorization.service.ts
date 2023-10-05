import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private router: Router,) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    const userDetails = localStorage.getItem('userDetails');
    return new Promise((resolve) => {
      if (userDetails) {
        return resolve(true);
      }
      this.router.navigate(['/auth/login'])
      return resolve(false);
    });
  }

}

export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean> | boolean => {
  return inject(AuthorizationService).canActivate(route, state);
};
