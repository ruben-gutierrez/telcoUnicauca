
import { Component, OnInit } from '@angular/core';
import { TelcoProyectService, ArquitecturesService } from 'src/app/services/services.index';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { TelcoProyect } from 'src/app/models/models.index';


@Component({
  selector: 'app-admin-new-proyect',
  templateUrl: './admin-new-proyect.component.html',
  styleUrls: ['./admin-new-proyect.component.css']
})
export class AdminNewProyectComponent implements OnInit {
 constructor(private _telcoProyect: TelcoProyectService, 
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
    this._telcoProyect.createProyectTelco(dataform.value)
      .subscribe(res =>{
        this.resetForm(dataform);
        this.toastr.success('Proyecto creado');
        this.router.navigate(["/console"]);
        // AdminUsersComponent.getUsers();
      })
  }

}
