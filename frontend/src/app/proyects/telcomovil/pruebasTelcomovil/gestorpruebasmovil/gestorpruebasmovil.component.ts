import { Component, OnInit } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormControl, Validators, Form } from "@angular/forms";
import { UsersService, ServerService,ArquitecturesService, OpenstackQueriesService, MachinesMovilService } from 'src/app/services/services.index';
import { User } from 'src/app/models/models.index';
import { Location } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { async } from '@angular/core/testing';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-gestorpruebasmovil',
  templateUrl: './gestorpruebasmovil.component.html',
  styleUrls: ['./gestorpruebasmovil.component.css']
})
export class GestorpruebasmovilComponent implements OnInit {
  machines:any;
  closeResult = '';
  //maquina virtual
  loading=false;
  idMachine:string;
  arquitecture: any;
  showcore:boolean=true;
  formNewServer: FormGroup;
  images:object;
  flavors:object;
  core:any;
  vmsAditionals: any;
  resourcesDisp={
    ram : 0,
    vcpus:0,
    disk:0,
    vms:0,
    status: false
  
  }
  vmDelete={
    idVm:"",
    nameVm:"",
    index:""
  }
  constructor(private modalService:NgbModal,
    private activatedRouter: ActivatedRoute,
       // private _arquitecture: ArquitecturesService,
        // private _server: ServerService,
        private toastr: ToastrService,
        private router: Router,
        private _openstack: OpenstackQueriesService,
        private _machineMovil: MachinesMovilService,
        private _location: Location)  { 
          this.activatedRouter.params.subscribe( params =>{
          this.idMachine = params.id;
          this.getMachines();
         })
       }
       

  async ngOnInit() {
    this.formNewServer = new FormGroup({
      idArq: new FormControl( this.idMachine),
      name: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      cpu: new FormControl(null, Validators.required),
      ram: new FormControl(null, Validators.required),
      disk : new FormControl(null, Validators.required),

    })
     await this.getMachine(this.idMachine);
    this.vmsAditionals=this.arquitecture.vmAditionals;
    
    this.resourcesDisp=await this.resourceDisp(this.arquitecture);
   
    this.core=this.arquitecture.vmCoreIMS;
   
    await this.consultImages();
 
    await this.consultFlavor();

   
  }

  open(content) {
    this.modalService.open(content, {size:'lg', windowClass: 'modal-img',ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async consultImages(){
    this._openstack.getImages()
    .subscribe( response =>{
      this.images=response;
    })
  }

  async consultFlavor(){
    this._openstack.getFlavors()
    .subscribe(response =>{
      this.flavors=response
    })
  }

  
  async newServer(){
    this.loading=true
    // console.log(this.formNewServer.value)    
    await this._machineMovil.createMachine(this.formNewServer.value)
    // await this._machineMovil.addMachineOp(this.formNewServer.value)
    .subscribe(async response =>{
      this.loading=false
      if(Response['status']==200){
        this.getMachine(this.idMachine);
        this.toastr.success('Máquina virtual creada')
        this.arquitecture.vmAditionals.push(response['content'])
        this.core=this.arquitecture.vmAditionals;
        this.resourcesDisp=await this.resourceDisp(this.arquitecture);
        this._location.back();
      }
      else{
        this.toastr.success('Error al crear la máquina virtual')  
      }
    }
      )
    
  }

  async getMachine(id){
    await this._machineMovil.getMachine(id)
    .toPromise()
    .then(data =>{
      if(data['status']==200){
        this.arquitecture = data['content'];

      }else{
        this.toastr.error('la base de datos esta temporalemnte fuera de servicio')
        this.arquitecture=[]
      }
    })

  }

  async resourceDisp(arquitecture){
    let resorceDIsp={
      ram:0,
      vcpus:0,
      disk:0,
      vms:0,
      status:false
    }
    if(arquitecture.vmAditionals.length >0){
      for await (let vm of arquitecture.vmAditionals){
        await this._openstack.showFlavor(vm.infoServe.flavor.id)
        .toPromise()
        .then(data =>{
          resorceDIsp.ram += data['flavor'].ram;
          resorceDIsp.disk += data ['flavor'].disk;
          resorceDIsp.vcpus += data ['flavor'].vcpus;

        })
      }
    }

    resorceDIsp.ram = arquitecture.maxRAM - resorceDIsp.ram;
    resorceDIsp.disk = arquitecture.maxHDD - resorceDIsp.disk ;
    resorceDIsp.vcpus = arquitecture.maxCore - resorceDIsp.vcpus;
    resorceDIsp.vms= arquitecture.maxVM- arquitecture.vmCoreIMS.length
    if (resorceDIsp.ram > 0 && resorceDIsp.disk > 0 && resorceDIsp.vcpus > 0 && resorceDIsp.vms >> 0 ) {
      resorceDIsp.status= true;
    }
    return resorceDIsp;


  }



  getMachines(){
    this._machineMovil.getMachines()
      .subscribe((data: any) => {
        this.machines = data;
        // console.log(this.users);
    });  
  }
  formatLabel(value:number){
    if(value >= 1000){
      return Math.round(value/1000) + 'k';
    }
    return value;
  }


  deleteMachine(id:string, index){
    // console.log(id);
    this._machineMovil.deleteMachine(id)
      .subscribe( res =>{
        var i = this.machines.indexOf( id );
        this.machines.splice(index, 1 );
        // console.log(this.users);
        // console.log(i);
      });
  }
  setInfoVmDelete(idVm, index){
    this.vmDelete={
      idVm:idVm,
      nameVm:"",      
      index:index
    }
    
    this._machineMovil.getServer(idVm).subscribe( 
      data =>{
        this.vmDelete.nameVm=data['content'].name
      })
   
      
  }
  async dropArq (id) {
    // console.log(id);
   await this._machineMovil.deleteMachine(id)
    .subscribe( res =>{
    
      var i = this.machines.indexOf( id );
      this.machines.splice(id, 1 );
      // console.log(this.users);
      // console.log(i);
    });
  }


  // await this._arquitecture.dropArquitecture(id)
  // .subscribe( data=>{
  //   // console.log(data)
  //   this.ngOnInit();
  //   this.toastr.success("Arquitectura liberada");
  // }, error =>{
  //   this.toastr.error("Error al liberar Arquitectura");
  // });

 

}
