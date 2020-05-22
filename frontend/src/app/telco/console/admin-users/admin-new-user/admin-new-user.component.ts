import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersService } from 'src/app/services/services.index';
import { User } from 'src/app/models/models.index';
// import { AdminUsersComponent } from '../admin-users.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-new-user',
  templateUrl: './admin-new-user.component.html',
  styleUrls: ['./admin-new-user.component.css']
})
export class AdminNewUserComponent implements OnInit {

  forma:FormGroup;



  constructor(private _users: UsersService, 
    private toastr: ToastrService,
    private router:Router ) { 
      
}

  ngOnInit() {
    this.forma = new FormGroup({
      _id: new FormControl( null),
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      role: new FormControl('guest')
    }, { validators: this.passError( 'password', 'password2') })
  }
  passError( field1: string, field2: string){
    return (group: FormGroup)=>{
      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;
      if( pass1 === pass2){
        return null
      }
      return {
        passError:true
      }
    }
  }

  resetForm(form?:NgForm){
    if (form){
    form.reset();

    }
  }

  createUser(){
    console.log( this.forma.valid);
   console.log(this.forma.value);
   this._users.createUser(this.forma.value)
     .subscribe(res =>{
    
     this.toastr.success('Usuario creado');
     this.router.navigate(["/console"]);
     })
  }



}
