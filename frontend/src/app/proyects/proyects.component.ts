import { Component, OnInit } from '@angular/core';


declare function init_plugins();
@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent implements OnInit {

  constructor() {
    
     }

  ngOnInit() {
    init_plugins();
  }

}
