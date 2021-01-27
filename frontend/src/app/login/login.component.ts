import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { UsersService } from "src/app/services/services.index";
import { User } from 'src/app/models/models.index';

import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

import { Router, ActivatedRoute, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

// declare function init_plugins();
   
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  previousUrl:string;
  goToHome:boolean;

  constructor(    private _users: UsersService, 
                  private router:Router,
                  private toastr: ToastrService,
                  private _location: Location

  ) {
    
   
   }

  ngOnInit() {
    // init_plugins();
    
    
  }
   
  resetForm(form?:NgForm){
    if (form){
      form.reset();
    }
  }

  login(infoLogin:NgForm){
    // console.log(this.previousUrl)
    console.log('test');
    this._users.loginUser(infoLogin.value)
      .subscribe( data => {
        // console.log(data)
        this.resetForm(infoLogin);
        this._users.userLoged=true;
        this._users.userActive =data['user'];
        this._users.setUser(data['user']);
        this._users.setToken(data['token']);
        this._users.tokenActive = data['token'];
        // console.log(this.previousUrl)
        if(this._users.pageRegister ){
          this.router.navigate(["/home"]);
          this._users.pageRegister=false;

        }else{
          this._location.back();
        }
        
        // console.log(data['user'])
      },
      error=>{
        this.toastr.error("Datos erroneos" + error);
      }
    );
  }






}
