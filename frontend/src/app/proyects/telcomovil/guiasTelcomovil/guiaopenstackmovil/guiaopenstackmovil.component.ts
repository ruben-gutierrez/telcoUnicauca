import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guiaopenstackmovil',
  templateUrl: './guiaopenstackmovil.component.html',
  styleUrls: ['./guiaopenstackmovil.component.css']
})
export class GuiaopenstackmovilComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  scroll(el:HTMLElement){
    el.scrollIntoView()
  }


}
