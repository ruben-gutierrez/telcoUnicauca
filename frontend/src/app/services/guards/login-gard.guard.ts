import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from "src/app/services/telco/users.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGardGuard implements CanActivate {
  constructor(
    public _user: UsersService,
    public router: Router
  ){

  }
  canActivate(  ){
    if (this._user.logued()) {
      return true
    }
    this.router.navigate(['/login'])
    return false;
  }
  
}
