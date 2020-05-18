import { Component, OnInit } from '@angular/core';


import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/services.index';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/models.index';


@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  
    editUser:boolean=true;
    user: User[] = [];
    constructor(    private activatedRoute: ActivatedRoute, 
                    private _users: UsersService, 
                    private toastr: ToastrService ) { 
      this.activatedRoute.params.subscribe( params =>{
         
        this._users.getUser(params['id'])
          .subscribe((data: any) => {
            this.user = data;
          });
      });
    }
  ngOnInit(): void {
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
