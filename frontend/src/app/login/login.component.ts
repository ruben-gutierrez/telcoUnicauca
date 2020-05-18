import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { UsersService } from "src/app/services/services.index";
import { User } from 'src/app/models/models.index';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


declare function init_plugins();
   
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(    private _users: UsersService, 
                  private router:Router,
                  private toastr: ToastrService

  ) {

   }

  ngOnInit() {
    init_plugins();
  }
  resetForm(form?:NgForm){
    if (form){
      form.reset();
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
        this.router.navigate(["/ims/arquitectures"]);
        
        // console.log(data['user'])
      },
      error=>{
        this.toastr.error("Datos erroneos" + error);
      }
    );
  }






}
