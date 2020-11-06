import { Component, OnInit } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-redes4gmovil',
  templateUrl: './redes4gmovil.component.html',
  styleUrls: ['./redes4gmovil.component.css']
})
export class Redes4gmovilComponent{

  closeResult = '';


  constructor(private modalService: NgbModal) { }

  // ngOnInit(): void {
  // }
  open(content) {
    this.modalService.open(content, {size:'xl', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
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
