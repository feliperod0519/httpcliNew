import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationServiceService } from '../app/authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router,
              private authenticationService: AuthenticationServiceService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUser;
        if (currentUser) {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
  }
}
