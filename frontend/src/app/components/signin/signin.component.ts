import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../shared/navbar/navbar.component';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private _users: UsersService, 
              private router:Router,
              private toastr: ToastrService) { 

  }

  ngOnInit() {
  }
  resetForm(form?:NgForm){
    if (form){
      form.reset();
      this._users.selectedUser = new User();
    }
  }
  login(infoLogin:NgForm){
    
    this._users.loginUser(infoLogin.value)
      .subscribe( data => {
        // console.log(data)
        this.resetForm(infoLogin);
        this._users.userActive =data['user'];
        this._users.setUser(data['user']);
        this._users.setToken(data['token']);
        this._users.tokenActive = data['token'];
        this.router.navigate(["/home"]);
        // console.log(data['user'])
      },
      error=>{
        this.toastr.error("Datos erroneos" + error);
      }
    );
  }
}
