import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private _users: UsersService) { 

  }

  ngOnInit() {
  }
  login(infoLogin:NgForm){
    // this._users.loginUser(infoLogin)
    
  }
}
