import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent  {
  
  editUser:boolean=true;
  user: User[] = [];
  constructor( private activatedRoute: ActivatedRoute, private _users: UsersService, private toastr: ToastrService ) { 
    this.activatedRoute.params.subscribe( params =>{
       
      this._users.getUser(params['id'])
        .subscribe((data: any) => {
          this.user = data;
        });
    });
  }
  updateUser(userForm){
    
    this._users.updateUser(userForm.value)
      .subscribe(res =>{
        if(res['status'] == 'User Updated'){
          this.editUser=true;
          this.toastr.success("Usuario Actualizado");
        }else{
          this.toastr.error("Error al actualizar");
        }
      });
    
  }


}
