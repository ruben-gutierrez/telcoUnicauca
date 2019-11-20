import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arquitecture-ims',
  templateUrl: './arquitecture-ims.component.html',
  styleUrls: ['./arquitecture-ims.component.css']
})
export class ArquitectureImsComponent implements OnInit {
  vm_core=[
    {
      '_id': '1',
      'name': 'bono',
    },
    {
      '_id': '2',
      'name': 'sprout',
    },
    {
      '_id': '3',
      'name': 'ellis',
    },
    {
      '_id': '4',
      'name': 'homer',
    },
    {
      '_id': '5',
      'name': 'vellum',
    },
    {
      '_id': '5',
      'name': 'dime',
    },
    {
      '_id': '6',
      'name': 'DNS',
    },
    
   
  ];
  constructor() { }

  ngOnInit() {
  }

}
