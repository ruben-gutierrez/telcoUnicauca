import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ArquitecturesService } from 'src/app/services/services.index';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-admin-new-arquitecture',
  templateUrl: './admin-new-arquitecture.component.html',
  styleUrls: ['./admin-new-arquitecture.component.css']
})
export class AdminNewArquitectureComponent implements OnInit {
  loading=false;
  route:any;
  arquitectureTest:any={
    name:"Aio Test",
    ipNet:"170.10.0.0",
    type:"1",
    status:"public",
    ram:"4096",
    cpu:"8", 
    hdd:"20",
    vms:"5"
  }
  constructor( 
      private _arquitecture:ArquitecturesService,
      private toastr: ToastrService,
      private router:Router,
      private activateRoute : ActivatedRoute,
      private _location: Location
    ) { 
      this.route=router.url;  
  }

  ngOnInit() {
  }
  changeloading(){
    console.log(this.loading)
    if (this.loading) {
      this.loading=false;
    }else{
      this.loading=true;
    }
  }
  resetForm(form?:NgForm){
    if (form){
      form.reset();
    }
  }
  createArquitecture(dataform:NgForm){
    this.loading=true;
     this._arquitecture.createArquitecture(dataform.value)
      .subscribe(res =>{
        // console.log(res)
        this.loading=false
        this.resetForm(dataform);
        this.toastr.success('Arquitectura Creada');
        this._location.back();
      },
      error=>{
        this.loading=false
        this.toastr.error('Error al crear la arquitectura');
        // console.log(error)
      })
      
  }


}
