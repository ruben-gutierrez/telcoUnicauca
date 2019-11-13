import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent  {

  user: any[] = [];
  constructor( private activatedRoute: ActivatedRoute, private _users: UsersService ) { 
    this.activatedRoute.params.subscribe( params =>{
       
      this._users.getUser(params['id'])
        .subscribe((data: any) => {
          console.log(data);
          this.user = data;
        });
    });
  }
  


}
