import { Component, OnInit } from '@angular/core';
import { UsersService } from "src/app/services/services.index";
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  user:User
  constructor(private _user:UsersService) { }

  ngOnInit(): void {
    this.user=this._user.getCurrentUser()
  }

  logout(){
    this._user.logOutUser()
  }

}
