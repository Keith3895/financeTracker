import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {LoginService} from '../service/login/login.service';
@Injectable()
export class BasicGuard implements CanActivate {
  constructor(private loginservice: LoginService,
  private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.loginservice.loggedIn())
        this.router.navigate(['/login']);
    return this.loginservice.loggedIn();
  }
}
