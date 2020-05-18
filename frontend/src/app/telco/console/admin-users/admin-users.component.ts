import { Component, OnInit } from '@angular/core';
import { UsersService } from "src/app/services/services.index";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: any
  un=[{name:'usuario'}, {name: ' usuario 2'}]
  constructor( private _user: UsersService ) { 
    this.getUsers();
   }

  ngOnInit() {

  }
   getUsers(){
    this._user.getUsers()
      .subscribe((data: any) => {
        this.users = data;
        // console.log(this.users);
    });  
  }
  deleteuser(id:string, index){
    // console.log(id);
    this._user.deleteUser(id)
      .subscribe( res =>{
        var i = this.users.indexOf( id );
        this.users.splice(index, 1 );
        // console.log(this.users);
        // console.log(i);
      });
  }

}
