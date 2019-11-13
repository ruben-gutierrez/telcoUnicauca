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
  

  

}
