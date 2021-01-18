import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgForm, FormGroup, FormControl, Validators, Form } from "@angular/forms";
import { UsersService, ServerService,ArquitecturesService, OpenstackQueriesService } from 'src/app/services/services.index';
import { User } from 'src/app/models/models.index';
import { Location } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-server',
  templateUrl: './new-server.component.html',
  styleUrls: ['./new-server.component.css']
})
export class NewServerComponent implements OnInit {
  loading=false;
  idArquitecture:string;
  arquitecture: any;
  showcore:boolean=true;
  formNewServer: FormGroup;
  images:object;
  core:any;
  vmsAditionals: any;
  resourcesDisp={
    ram : 0,
    vcpus:0,
    disk:0,
    vms:0,
    status: false
  }

  constructor(
        private activatedRouter: ActivatedRoute,
        private _arquitecture: ArquitecturesService,
        private _server: ServerService,
        private toastr: ToastrService,
        private router: Router,
        private _openstack: OpenstackQueriesService,
        private _location: Location
  ) { 
      this.activatedRouter.params.subscribe( params =>{
      this.idArquitecture = params.id;
     })
   }

  async ngOnInit() {
    this.formNewServer = new FormGroup({
      idArq: new FormControl( this.idArquitecture),
      name: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      cpu: new FormControl(null, Validators.required),
      ram: new FormControl(null, Validators.required),
      disk : new FormControl(null, Validators.required),
    })
    await this.getArquitecture(this.idArquitecture);
   
    
    this.vmsAditionals=this.arquitecture.vmAditionals;
    
    this.resourcesDisp=await this.resourceDisp(this.arquitecture);
   
    this.core=this.arquitecture.vmCoreIMS;
   
    await this.consultImages();

   
  }
  async consultImages(){
    this._openstack.getImages()
      .subscribe( response =>{
        this.images=response;
      })
  }
  showims(){
    this.showcore=true
    this.core=this.arquitecture.vmCoreIMS;
  }
  showaditional(){
    this.showcore=false
    this.core=this.arquitecture.vmAditionals;
  }
  async newServer(){
    this.loading=true
    // console.log(this.formNewServer.value)    
    await this._server.addServerArquitecture(this.formNewServer.value) 
      .subscribe( async response =>{
        this.loading=false
        // console.log(response)
        if (response['status'] == 200) {
          this.getArquitecture(this.idArquitecture);
          this.toastr.success('Máquina virtual creada')
          this.arquitecture.vmAditionals.push(response['content'])
          this.core=this.arquitecture.vmAditionals;
          this.resourcesDisp= await this.resourceDisp(this.arquitecture);
          this._location.back();          
        }else{
          this.toastr.success('Error al crear la máquina virtual')          
        }       
      })
      this.resourcesDisp=await this.resourceDisp(this.arquitecture);
    
  }
  async getArquitecture(id){  
    await this._arquitecture.getArquitecture(id)
          .toPromise( )
          .then(data =>{
           //  console.log(data)
          if(data['status']==200){
           this.arquitecture = data['content'];
          }else{
           this.toastr.error('La base de datos esta temporalmente fuera de servicio')
            this.arquitecture=[]
          }
           
          })
   }
   async resourceDisp(arquitecture){
    let resourcesDisp={
      ram : 0,
      vcpus:0,
      disk:0,
      vms:0,
      status: false
    }
    if (arquitecture.vmAditionals.length > 0) {
      for await ( let vm of arquitecture.vmAditionals){
        await this._openstack.showFlavor(vm.infoServer.flavor.id)
          .toPromise()
          .then( data=>{
            resourcesDisp.ram += data['flavor'].ram;
            resourcesDisp.disk +=  data['flavor'].disk;
            resourcesDisp.vcpus += data['flavor'].vcpus;
            
          })
  
      }
    }
    // console.log("recuross usados", resourcesDisp)
    // console.log("disco", arquitecture.maxHDD)
    
    // this.resourcesDisp.ram = this.resourcesDisp.ram  + 11; 
    
    
    resourcesDisp.ram = arquitecture.maxRAM - resourcesDisp.ram;
    resourcesDisp.disk = arquitecture.maxHDD - resourcesDisp.disk ;
    resourcesDisp.vcpus = arquitecture.maxCore - resourcesDisp.vcpus;
    resourcesDisp.vms= arquitecture.maxVM- arquitecture.vmCoreIMS.length
    if (resourcesDisp.ram > 0 && resourcesDisp.disk > 0 && resourcesDisp.vcpus > 0 && resourcesDisp.vms >> 0 ) {
      resourcesDisp.status= true;
    }
    return resourcesDisp;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
}
