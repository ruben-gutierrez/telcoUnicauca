import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _users: UsersService, 
              private router:Router,
              private toastr: ToastrService) { }

  ngOnInit() {
  }
  resetForm(form?:NgForm){
    if (form){
      form.reset();
      this._users.selectedUser = new User();
    }
  }
  register(infoNewUser:NgForm){
    infoNewUser.value.role='guest';
    
    this._users.createUser(infoNewUser.value)
      .subscribe( data => {
        // console.log(data)
        this.resetForm(infoNewUser);
        
        this.toastr.success("Cuenta Creada exitosamente, ingrese por favor.");
        this.router.navigate(["/signin"]);
        // console.log(data['user'])
      },
      error=>{
        this.toastr.error("Error al registrarse, Intentelo nuevamente" + error);
      }
    );
  }

}
