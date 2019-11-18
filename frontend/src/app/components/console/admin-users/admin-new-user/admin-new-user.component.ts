import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { AdminUsersComponent } from '../admin-users.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-new-user',
  templateUrl: './admin-new-user.component.html',
  styleUrls: ['./admin-new-user.component.css']
})
export class AdminNewUserComponent implements OnInit {

  constructor(private _users: UsersService, 
              private toastr: ToastrService,
              private router:Router ) { 
  }

  ngOnInit() {
  }

  resetForm(form?:NgForm){
    if (form){
      form.reset();
      this._users.selectedUser = new User();
    }
  }
  createUser(dataform:NgForm){
    this._users.createUser(dataform.value)
      .subscribe(res =>{
        this.resetForm(dataform);
        this.toastr.success('Usuario creado');
        this.router.navigate(["/console"]);
        // AdminUsersComponent.getUsers();
      })
  }

}
