import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styles: []
})
export class AdminUsersComponent  {
  users: any[] = [];
  
  constructor( private _users: UsersService ) { 
    this._users.getUsers()
      .subscribe((data: any) => {
        console.log(data);
        this.users = data;
      });
  }
  deleteuser(id:string){
    // console.log(id);
    this._users.deleteUser(id)
      .subscribe( res =>{
        var i = this.users.indexOf( id );
        this.users.splice( i, 1 );
        console.log(this.users);
      });
  }
}
