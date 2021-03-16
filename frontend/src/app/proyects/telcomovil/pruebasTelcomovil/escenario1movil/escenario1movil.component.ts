import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TestsMovilService, ServerService,ArquitecturesService, OpenstackQueriesService, MachinesMovilService } from 'src/app/services/services.index';
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
    private modalService: NgbModal) {
    _config.closeOthers = true;

  }

  ngOnInit(): void {
    this.formNewTest = new FormGroup({
      idArq: new FormControl( 1),
      canal: new FormControl(null, Validators.required),
      simsnr: new FormControl(null, Validators.required),
      trama: new FormControl(null, Validators.required),
      inisnr: new FormControl(null, Validators.required),
      modotx: new FormControl(null, Validators.required),
      mcs : new FormControl(null, Validators.required),
      modelocanal : new FormControl(null, Validators.required),
      bloquerecu : new FormControl(null, Validators.required),
      antenasue : new FormControl(null, Validators.required),
      antenasenb : new FormControl(null, Validators.required),
      puerenb : new FormControl(null, Validators.required),
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
    // this.loading=true;
    // this.messageLoading="Creando Servidor"
    // // this.modalService.open(content, { size: 'sm' })
    // document.getElementById('btnclose').click();
     this._testsMovil.executeTest(this.formNewTest.value)
    .subscribe(async response =>{
      console.log(response);
    //   this.loading=false
    //   if(response['status']==200){
    //     this.toastr.success('Prueba virtual creada')
    //     this.ngOnInit();
    //     this.modalService.dismissAll();
    //     //this.arquitecture.vmAditionals.push(response['content'])
    //     //this.core=this.arquitecture.vmAditionals;
    //     //this.resourcesDisp=await this.resourceDisp(this.arquitecture);
    //     //this._location.back();
    //   }
    //   else{
    //     this.toastr.success('Error al crear la máquina virtual')  
    //   }
    })

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
