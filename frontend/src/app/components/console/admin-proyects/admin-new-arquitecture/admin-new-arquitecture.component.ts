import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ArquitectureService } from 'src/app/services/arquitectures.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-admin-new-arquitecture',
  templateUrl: './admin-new-arquitecture.component.html',
  styleUrls: ['./admin-new-arquitecture.component.css']
})
export class AdminNewArquitectureComponent implements OnInit {
  route:any;
  arquitectureTest:any={
    name:"aiotest",
    ipNet:"10.55.5.0",
    type:"1",
    status:"public",
    ram:"9",
    cpu:"9",
    hdd:"9",
    vms:"9"
  }
  constructor( 
      private _arquitecture:ArquitectureService,
      private toastr: ToastrService,
      private router:Router,
      private activateRoute : ActivatedRoute,
      private _location: Location
    ) { 
      this.route=router.url;  
  }

  ngOnInit() {
  }
  resetForm(form?:NgForm){
    if (form){
      form.reset();
    }
  }
  createProyect(dataform:NgForm){
     this._arquitecture.createArquitecture(dataform.value)
      .subscribe(res =>{
        console.log(res)
        this.resetForm(dataform);
        this.toastr.success('Arquitectura Creada');
        this._location.back();
      },
      error=>{
        console.log(error)
      })
      
  }

}
