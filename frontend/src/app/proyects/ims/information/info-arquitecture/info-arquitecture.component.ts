import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-arquitecture',
  templateUrl: './info-arquitecture.component.html',
  styleUrls: ['./info-arquitecture.component.css']
})
export class InfoArquitectureComponent implements OnInit {
  flatArqCWDistribuido=false;
  flatArqCWAIO=false;
  flatInfoVM=false;
  flatReserArq=false;
  
  constructor() { }

  ngOnInit(): void {
  }
  changeArqCWDistribuido(){
    if (this.flatArqCWDistribuido) {
      this.flatArqCWDistribuido=false;
    } else {
      this.flatArqCWDistribuido=true;
    }
  }
  changeArqCWDistribuidoAIO(){
    if (this.flatArqCWAIO) {
      this.flatArqCWAIO=false;
    } else {
      this.flatArqCWAIO=true;
    }
  }
  
  changeInfoVM(){
    if (this.flatInfoVM) {
      this.flatInfoVM=false;
    } else {
      this.flatInfoVM=true;
    }
  }
  changeReserArq(){
    if (this.flatReserArq) {
      this.flatReserArq=false;
    } else {
      this.flatReserArq=true;
    }
  }

}
