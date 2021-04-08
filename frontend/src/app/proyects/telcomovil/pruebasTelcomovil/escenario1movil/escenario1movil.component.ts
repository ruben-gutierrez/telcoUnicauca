import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TestsMovilService, ResultMovilService, ServerService,ArquitecturesService, OpenstackQueriesService, MachinesMovilService } from 'src/app/services/services.index';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormGroup, FormControl, Validators, Form, FormsModule } from "@angular/forms";

import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/models.index';
import { Location } from '@angular/common';


import { ActivatedRoute } from '@angular/router';
import { async } from '@angular/core/testing';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


@Component({
  selector: 'app-escenario1movil',
  templateUrl: './escenario1movil.component.html',
  styleUrls: ['./escenario1movil.component.css']
})
export class Escenario1movilComponent implements OnInit {

  messageLoading:string;
  //maquina virtual
  loading=false;
  formNewTest: FormGroup
  machines:any;
  modal:NgbModalRef;
  ipMv="0";
  optionSelect;
  address:any;
  closeResult = '';
  images: object;
  tramas;
  inisnr;
  canal;
  modotx;
  cc;
  modelocanal;
  mcs;
  bloquerecu;
  simsnr;
  antenasue;
  puerenb;


  constructor(private _config: NgbAccordionConfig, 
    private router: Router,
    private toastr: ToastrService,
    private _testsMovil: TestsMovilService,
    private _resultMovil: ResultMovilService,
    private _server: ServerService,
    private _openstack: OpenstackQueriesService,
    private _machineMovil: MachinesMovilService,
    private modalService: NgbModal) {
    _config.closeOthers = true;    
    this.getMachines();

  }

  ngOnInit(): void {
    this.formNewTest = new FormGroup({
      // idArq: new FormControl( 1),
      idMv: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      ipFlotante: new FormControl(null, Validators.required),
      tramas: new FormControl(null, Validators.required),
      inisnr: new FormControl(null),
      canal: new FormControl(null),
      // canal: new FormControl(null, Validators.required),
      modotx: new FormControl(null),
      antenasue : new FormControl(null),
      modelocanal : new FormControl(null),
      mcs : new FormControl(null, Validators.max(28)),
      bloquerecu : new FormControl(null),
      simsnr: new FormControl(null),
      antenasenb : new FormControl(null),
      puerenb : new FormControl(null),

    })
  }



  open(content) {
    this.modalService.open(content, {size:'lg', windowClass: 'modal-img',ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

  openXl(content) {
    this.modalService.open(content, { size: 'lg' });
  }



  newPrueba(){

    console.log(this.formNewTest.value)
    this.loading=true;
    this.messageLoading="Creando Prueba"
    // // this.modalService.open(content, { size: 'sm' })
    // document.getElementById('btnclose').click();
     this._testsMovil.executeTest(this.formNewTest.value)
    .subscribe(async response =>{
      console.log(response);
      this.loading=false
       if(response['code']==200){
         this.toastr.success('Prueba virtual creada')
        //  this.ngOnInit();
        //  this.modalService.dismissAll();
         //this.arquitecture.vmAditionals.push(response['content'])
         //this.core=this.arquitecture.vmAditionals;
    //     //this.resourcesDisp=await this.resourceDisp(this.arquitecture);
    //     //this._location.back();
       }
       else{
         this.toastr.success('Error al crear Prueba Virtual')  
       }
    })
    // this._resultMovil.createResult(this.formNewTest.value)
    // .subscribe(async response =>{
    //   console.log("resultadooooo",response);
    //   this.loading=false
    //    if(response['code']==200){
    //      this.toastr.success('Resultado prueba virtual creada')
    //    }
    //    else{
    //      this.toastr.success('Error al crear Resultado Virtual')  
    //    }
    // })
  }

  getIpfloatMv(id){
    let add;
   this._machineMovil.getServer(id)
    .subscribe((data: any) => {
    add=data.content.infoServer.addresses["movil-net"][1].addr
    this.formNewTest.controls['ipFlotante'].setValue(add)
  }, error=>{
    this.toastr.error("Error al obtener las ipFlotante")
  })
  }
      
  ipFloat(){
    this.ipMv=this.optionSelect;
    this.getIpfloatMv(this.ipMv)
  }

  getMachines(){
    this._machineMovil.getMachines()
      .subscribe((data: any) => {
        this.machines = data;
      
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

}
