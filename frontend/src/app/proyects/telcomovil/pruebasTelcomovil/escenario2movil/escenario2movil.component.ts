import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
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
  selector: 'app-escenario2movil',
  templateUrl: './escenario2movil.component.html',
  styleUrls: ['./escenario2movil.component.css']
})
export class Escenario2movilComponent implements OnInit {
  machines:any;
  closeResult = '';
  loading=false;
  idMachine:string;
  messageLoading:string;

  constructor(private modalService:NgbModal,
    private activatedRouter: ActivatedRoute,
       // private _arquitecture: ArquitecturesService,
        private _server: ServerService,
        private toastr: ToastrService,
        private router: Router,
        private _openstack: OpenstackQueriesService,
        private _machineMovil: MachinesMovilService,
        private _location: Location) { 
          this.activatedRouter.params.subscribe( params =>{
            this.idMachine = params.id;
            this.getMachines();
           })
        }

  ngOnInit(): void {
  }

  getMachines(){
    this._machineMovil.getMachines()
      .subscribe((data: any) => {
        this.machines = data;
        // console.log(this.users);
    });  
  }

  consoleServer(id){
    this.loading=true;
    this.messageLoading="Creando consola; recuerde que se habilita por 1 hora"
    this._server.actionsServer(id,'console')
      .subscribe( data =>{
        this.toastr.success('Consola creada, verifique la creación de nuevas pestañas');
        this.toastr.warning('Consola valida por 1 Hora');
        
        this.loading=false;
        window.open(data['consoleLink'],'_blank');  
        
      }, error=>{
        this.toastr.error('Error al lanzar la consola');
        this.loading=false;
      })
  }

  

    powerServer(id){    
      // this.loading=true
      this._server.actionsServer(id,'on/off')
        .subscribe( data =>{
          // this.loading=false;
          if (data['action']== 'off') {
            this.toastr.success('La mv se ha apagado correctamente')
            
          }else{
            this.toastr.success('La mv se ha encendido correctamente')
  
          }
        }, error=>{
          // this.loading=false;
          this.toastr.error('Error al apagar la máquina')
        })
    }

}
