import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nav-ims',
  templateUrl: './nav-ims.component.html',
  styles: []
})
export class NavImsComponent implements OnInit {
  user:User[]= [];
  token:string;
  constructor( private _users: UsersService, private router: Router ) { 
    this._users.userActive = this._users.getCurrentUser();
    this.token=this._users.getToken();
  }
  
  ngOnInit() {
    this.user = this._users.getCurrentUser();
  }
  
  logOut(){

    this._users.logOutUser( );
    this.router.navigate(["/home"]);
  }

  updateDataUser(){
    this.user = this._users.getCurrentUser();
  }


}
