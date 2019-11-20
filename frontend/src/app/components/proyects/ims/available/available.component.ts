import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css']
})
export class AvailableComponent implements OnInit {
  arquitectures_free=[
    {
      '_id': '1',
      'name': 'IMS DISTRIBUIDO',
      'description': 'Arquitectura IMS distribuida compuesta por 5 nodos encargador de proveer las funcionalidades de llamadas y video llamadas',
      'propertiesAditionalRAM': "2",
      'propertiesAditionalHDD': "40",
      'propertiesAditionalCORE': "8",
      'propertiesAditionalVM': "8",
      'img':'coreDistributed.png',
      'available':false,
      'dataEndReservation': Date(),
      'dataStartReservation':null,
        
    },
    {
      '_id': '1',
      'name': 'IMS DISTRIBUIDO',
      'description': 'Arquitectura IMS distribuida compuesta por 5 nodos encargador de proveer las funcionalidades de llamadas y video llamadas',
      'propertiesAditionalRAM': "2",
      'propertiesAditionalHDD': "40",
      'propertiesAditionalCORE': "8",
      'propertiesAditionalVM': "8",
      'img':'coreDistributed.png',
      'available':true,
      'dataEndReservation': Date(),
      'dataStartReservation':null,
        
    },
    {
      '_id': '1',
      'name': 'IMS Todo en Uno',
      'description': 'Arquitectura IMS distribuida compuesta por 5 nodos encargador de proveer las funcionalidades de llamadas y video llamadas',
      'propertiesAditionalRAM': "2",
      'propertiesAditionalHDD': "40",
      'propertiesAditionalCORE': "8",
      'propertiesAditionalVM': "8",
      'img':'coreDistributed.png',
      'available':true,
      'dataEndReservation': Date(),
      'dataStartReservation':null,
        
    },
   
  ];
  constructor() { }

  ngOnInit() {
  }

}
