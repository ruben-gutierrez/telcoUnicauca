import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gestorresultadosmovil',
  templateUrl: './gestorresultadosmovil.component.html',
  styleUrls: ['./gestorresultadosmovil.component.css']
})
export class GestorresultadosmovilComponent implements OnInit {

  constructor(private _config:NgbAccordionConfig ) {
    _config.closeOthers= true;
   }

  ngOnInit(): void {
  }

}

