import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-redes4gmovil',
  templateUrl: './redes4gmovil.component.html',
  styleUrls: ['./redes4gmovil.component.css']
})


export class Redes4gmovilComponent implements OnInit {

  closeResult = '';
  constructor(private _config: NgbAccordionConfig, private modalService:NgbModal) {
    _config.closeOthers=true;
   }

  ngOnInit(): void {
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

  
  



  // ngOnInit(): void {
  // }
  