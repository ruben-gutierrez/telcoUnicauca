import { Component, OnInit } from '@angular/core';
import { TelcoproyectService } from 'src/app/services/telcoproyects.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { ProyectTelco } from 'src/app/models/proyecTelco';
import { ArquitectureService } from "../../../../services/arquitectures.service";

@Component({
  selector: 'app-admin-new-proyect',
  templateUrl: './admin-new-proyect.component.html'  
})
export class AdminNewProyectComponent implements OnInit {

  constructor(private _arquitecture: TelcoproyectService, 
              private toastr: ToastrService,
              private router:Router) { }

  ngOnInit() {
  }

  resetForm(form?:NgForm){
    if (form){
      form.reset();
    }
  }
  createProyect(dataform:NgForm){
    this._arquitecture.createProyectTelco(dataform.value)
      .subscribe(res =>{
        this.resetForm(dataform);
        this.toastr.success('Proyecto creado');
        this.router.navigate(["/console"]);
        // AdminUsersComponent.getUsers();
      })
  }
}
