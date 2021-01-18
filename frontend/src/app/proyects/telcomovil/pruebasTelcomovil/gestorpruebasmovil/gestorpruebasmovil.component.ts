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

@Component({
  selector: 'app-gestorpruebasmovil',
  templateUrl: './gestorpruebasmovil.component.html',
  styleUrls: ['./gestorpruebasmovil.component.css']
})
export class GestorpruebasmovilComponent implements OnInit {
  machines:any;
  closeResult = '';
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
  vmDelete={
    idVm:"",
    nameVm:"",
    idArquitecture:"",
    nameArquitecture:"",
    index:""
  }
  constructor(private modalService:NgbModal,
    private activatedRouter: ActivatedRoute,
        private _arquitecture: ArquitecturesService,
        private _server: ServerService,
        private toastr: ToastrService,
        private router: Router,
        private _openstack: OpenstackQueriesService,
        private machineMovil: MachinesMovilService,
        private _location: Location)  { 
          this.activatedRouter.params.subscribe( params =>{
          this.idArquitecture = params.id;
          this.getMachines();
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
    // await this.getArquitecture(this.idArquitecture);
    
    
   

   
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
  async newServer(){
    this.loading=true
    // console.log(this.formNewServer.value)    
    this.machineMovil.createMachine(this.formNewServer.value)
    .subscribe(async Response =>{
      this.loading=false
      if(Response['status']==200){
        this.toastr.success('Máquina virtual creada')
      }
      else{
        this.toastr.success('Error al crear la máquina virtual')  
      }
    }
      )
    
  }
  getMachines(){
    this.machineMovil.getMachines()
      .subscribe((data: any) => {
        this.machines = data;
        // console.log(this.users);
    });  
  }


  deleteMachine(id:string, index){
    // console.log(id);
    this.machineMovil.deleteMachine(id)
      .subscribe( res =>{
        var i = this.machines.indexOf( id );
        this.machines.splice(index, 1 );
        // console.log(this.users);
        // console.log(i);
      });
  }




 

}
