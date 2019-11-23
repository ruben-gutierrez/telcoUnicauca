import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arquitecture-ims',
  templateUrl: './arquitecture-ims.component.html',
  styleUrls: ['./arquitecture-ims.component.css']
})
export class ArquitectureImsComponent implements OnInit {
  arqutiectures=[
    {
      '_id':'1',
      'idUser':'1',
      'status':'reserved',
      'mvs':[
        {
          'id':'1',
          'name':'bono'
        },
        {
          'id':'2',
          'name':'sprout'
        },
      ]
    }

  ];
  vms_core=[
    {
      '_id': '1',
      'arquitecture':'123',
      'name': 'bono',
    },
    {
      '_id': '2',
      'arquitecture':'123',
      'name': 'sprout',
    },
    {
      '_id': '3',
      'arquitecture':'123',
      'name': 'ellis',
    },
    {
      '_id': '4',
      'arquitecture':'123',
      'name': 'homer',
    },
    {
      '_id': '5',
      'arquitecture':'123',
      'name': 'vellum',
    },
    {
      '_id': '5',
      'arquitecture':'123',
      'name': 'dime',
    },
    {
      '_id': '6',
      'arquitecture':'123',
      'name': 'DNS',
    },
    
   
  ];
  constructor() { }

  ngOnInit() {
  }

}
