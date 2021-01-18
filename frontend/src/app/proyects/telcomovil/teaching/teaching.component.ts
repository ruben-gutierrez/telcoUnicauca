import { Component, OnInit } from '@angular/core';
import { MachinesMovilService } from 'src/app/services/services.index';


@Component({
  selector: 'app-teaching',
  templateUrl: './teaching.component.html',
  styleUrls: ['./teaching.component.css']
})
export class TeachingComponent implements OnInit {
  machines:any;
  constructor(  
    private _machinesMovil:MachinesMovilService,

  ) { 

  }
  
  ngOnInit(): void {
    this._machinesMovil.getMachines()
    .subscribe( data => {
      this.machines=data;
    })
  }
}
