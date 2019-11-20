import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.css']
})
export class ReservedComponent implements OnInit {
  arquitectures_reserved=[
    {
      '_id': '1',
      'name': 'IMS DISTRIBUIDO',
      'description': 'Arquitectura IMS distribuida compuesta por 5 nodos encargador de proveer las funcionalidades de llamadas y video llamadas',
      'descriptionUser': 'Arquitectura IMS distribuida compuesta por 5 nodos encargador de proveer las funcionalidades de llamadas y video llamadas',
      'propertiesAditionalRAM': "2",
      'propertiesAditionalHDD': "40",
      'propertiesAditionalCORE': "8",
      'propertiesAditionalVM': "8",
    },
    {
      '_id': '2',
      'name': 'IMS DISTRIBUIDO',
      'description': 'Arquitectura IMS distribuida compuesta por 5 nodos encargador de proveer las funcionalidades de llamadas y video llamadas',
      'descriptionUser': 'Arquitectura IMS distribuida compuesta por 5 nodos encargador de proveer las funcionalidades de llamadas y video llamadas',
      'propertiesAditionalRAM': "2",
      'propertiesAditionalHDD': "40",
      'propertiesAditionalCORE': "8",
      'propertiesAditionalVM': "8",
    },
    {
      '_id': '3',
      'name': 'IMS DISTRIBUIDO',
      'description': 'Arquitectura IMS distribuida compuesta por 5 nodos encargador de proveer las funcionalidades de llamadas y video llamadas',
      'descriptionUser': 'Arquitectura IMS distribuida compuesta por 5 nodos encargador de proveer las funcionalidades de llamadas y video llamadas',
      'propertiesAditionalRAM': "2",
      'propertiesAditionalHDD': "40",
      'propertiesAditionalCORE': "8",
      'propertiesAditionalVM': "8",
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
