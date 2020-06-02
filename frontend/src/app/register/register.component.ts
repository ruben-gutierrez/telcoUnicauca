import { Component, OnInit } from '@angular/core';


import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/models.index';
import { UsersService } from "src/app/services/services.index";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(  private _users: UsersService, 
                private router:Router,
                private toastr: ToastrService
                ) { }

  ngOnInit() {
    // init_plugins();
    this._users.pageRegister=true;
  }
  resetForm(form?:NgForm){
    if (form){
      form.reset();
      // this._users.selectedUser
    }
  }

  register(infoNewUser:NgForm){
    infoNewUser.value.role='guest';
   
    this._users.createUser(infoNewUser.value)
      .subscribe( data => {
        // console.log(data)
        this.resetForm(infoNewUser);
        
        this.toastr.success("Cuenta Creada exitosamente, ingrese por favor.");
        this.router.navigate(["/login"]);
        // console.log(data['user'])
      },
      error=>{
        this.toastr.error("Error al registrarse, Intentelo nuevamente" + error);
      }
    );
  }

  

}
