import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';
import { MachinesMovilService, } from 'src/app/services/services.index';
import { TestsMovilService, } from 'src/app/services/services.index';
import {NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormControl, Validators, Form, FormsModule } from "@angular/forms";
import { Location } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-gestorresultadosmovil',
  templateUrl: './gestorresultadosmovil.component.html',
  styleUrls: ['./gestorresultadosmovil.component.css']
})
export class GestorresultadosmovilComponent implements OnInit {

  machines:any;
  machine:any;
  tests:any;
  closeResult = '';
  modal:NgbModalRef;
  messageLoading:string;
  //maquina virtual
  resourcesFlavor
  loading=false;
  idMachine:string;
  arquitecture: any;
  showcore:boolean=true;
  formNewServer: FormGroup;
  images:object;
  ma:String[]= ["a","b","c"];
  testDelete={
    idtest:"",
    nametest:"",
    index:""
  }
  
  constructor(private config:NgbAccordionConfig, 
    private _tests:TestsMovilService, 
    private toastr: ToastrService,
    private _machineMovil: MachinesMovilService,
    private route:Router,
    private modalService:NgbModal,
    private activatedRouter: ActivatedRoute  ) {
      config.closeOthers=true
      this.activatedRouter.params.subscribe( params =>{
        this.idMachine = params.id;
       
       })
  
    this.getTests();
    this.getMachines();
   }
 

  ngOnInit(): void {
  }

// modal
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

  getTests(){
    let test
    this._tests.getTests()
      .subscribe((data: any) => {
        this.tests = data.content;
        console.log("obt prue", this.tests.length);
        if (this.tests.length == 0) {
          this.toastr.info("No tiene pruebas creadas");

        } else {
          this.toastr.info("si tiene pruebas creadas");
          for  (test of this.tests){
            test.idMv=this.getMv(test.idMv);
            test.tramas=this.getTest(test._id);
          }
        }
      }, error=>{
          this.toastr.error("Error en obtener prubas creadas")
        }
      )
 
  }
  getTest(id){
    let ts=[];
    console.log(id);
    this._tests.getTest(id)
    .subscribe((data: any) => {
      ts[0]=data.content.tramas;
      ts[1]=data.content.inisnr;
      ts[2]=data.content.canal;
      ts[3]=data.content.modotx;
      ts[4]=data.content.antenasue;
      ts[5]=data.content.modelocanal;
      ts[6]=data.content.mcs;
      ts[7]=data.content.bloquerecu;
      ts[8]=data.content.simsnr;
      ts[9]=data.content.antenasenb;
      ts[9]=data.content.puerenb;

  }, error=>{
    this.toastr.error("Error al obtener prueba")

  })
      return ts
 
  }

  getMv(id){
    let mv=[];
  this._machineMovil.getServer(id)
    .subscribe((data: any) => {
      mv[0]=data.content._id;
      mv[1]=data.content.name;

      console.log("info",data.content.name)
  }, error=>{
    this.toastr.error("Error al obtener las MV")

  })
   return mv; 
  }
  getMachines(){
    this._machineMovil.getMachines()
      .subscribe((data: any) => {
        this.machines = data;
        var dir='movil-net';
    });  
  } 
  setInfoVmDelete(idtest, index){
    this.testDelete={
      idtest:idtest,
      nametest:"",      
      index:index
    }
    console.log("va a eliminar")
    
    this._tests.getTest(idtest).subscribe( 
      data =>{
        this.testDelete.nametest=data['content'].name
        console.log("elimino")
      })      
  }
  
  deletePrueba(id:string, index){
    // console.log(id);
    this.loading=true
    this.messageLoading="Borrando prueba"
    this._tests.deleteTest(id)
    //this._machineMovil.deleteMachine(id)
      .subscribe( res =>{
        var i = this.tests.indexOf( id );
        this.tests.splice(index, 1 );
        this.toastr.success("Prueba eliminada")
        this.loading=false;
        // console.log(this.users);
        // console.log(i);
      });
  }

  routeResult(id){
    console.log("entro router")
    // this.route.navigate(['/telcomovil/resultados', id])
  }

}

