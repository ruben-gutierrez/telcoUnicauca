import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';




import { UsersService } from 'src/app/services/services.index';

import { isDefined } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {
  token:string;
  // answer:boolean = false;
  constructor( private _users: UsersService, private router: Router ){
  }
  
  async canActivate(){
    this.token=this._users.getToken();
    let answer:any;
    if( this.token ){
      //consultar a la ruta para ver si esta activo
      if (await this.verifyToken(this.token)) {
        answer = true;
      } else{
        this.router.navigate(["/login"]);
        answer= false;
        this._users.logOutUser();
      }
      
    return answer;
    }else{
      this.router.navigate(["/login"]);
      return false;
    }

    
  }
  async verifyToken(token){
  //  return true;
   let answer :any;
   await this._users.verifyToken(token)
        .toPromise( )
        .then(data =>{
           answer = data;
        })
        .catch(error=> {
           answer = error.error;
        })
   // console.log(answer);
   if ( isDefined( answer['status']) ) {
       return false;
   }else{
     if (answer['auth'] == 200) {
       this._users.userActive=this._users.getCurrentUser();
      // console.log(this._users.getCurrentUser());
        return true;

     }
     return false
   }
  }
}
