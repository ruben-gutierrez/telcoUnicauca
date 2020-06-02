import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';


import { UsersService } from 'src/app/services/services.index';
import { User } from 'src/app/models/models.index';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _users: UsersService, 
    private router: Router,
    private toastr: ToastrService ){

}
canActivate(){
let user:User = this._users.getCurrentUser();
console.log(user.role)
if (user.role == 'admin') {

return true
}
this.toastr.error('Permiso denegado');
return false;
}

}
