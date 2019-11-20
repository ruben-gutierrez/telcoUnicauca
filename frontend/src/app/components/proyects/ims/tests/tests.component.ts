import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  tests=[
    {
      '_id': '1',
      'name': 'Prueba 1',
      'description': 'Arquitectura IMS distribuida compuesta por 5 nodos encargador de proveer las funcionalidades de llamadas y video llamadas',
      'arquitecture': {
        '_id': '123',
        'name': 'aio',
      },
      'status':'run'
    },
    {
      '_id': '2',
      'name': 'Prueba 2',
      'description': 'Arquitectura IMS distribuida compuesta por 5 nodos encargador de proveer las funcionalidades de llamadas y video llamadas',
      'arquitecture': {
        '_id': '123',
        'name': 'aio',
      },
      'status':'stop'
    },
    {
      '_id': '3',
      'name': 'Prueba 3',
      'description': 'Arquitectura IMS distribuida compuesta por 5 nodos encargador de proveer las funcionalidades de llamadas y video llamadas',
      'arquitecture': {
        '_id': '123',
        'name': 'Distribuida2',
      },
      'status':'stop'
    },
    {
      '_id': '4',
      'name': 'Prueba 4',
      'description': 'Arquitectura IMS distribuida compuesta por 5 nodos encargador de proveer las funcionalidades de llamadas y video llamadas',
      'arquitecture': {
        '_id': '123',
        'name': 'Distribuida1',
      },
      'status':'stop'
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
