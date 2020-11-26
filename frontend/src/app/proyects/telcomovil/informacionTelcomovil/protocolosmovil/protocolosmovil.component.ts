import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-protocolosmovil',
  templateUrl: './protocolosmovil.component.html',
  styleUrls: ['./protocolosmovil.component.css']
})
export class ProtocolosmovilComponent implements OnInit {

  constructor(private _config: NgbAccordionConfig) {
    _config.closeOthers=true;
   }

  ngOnInit(): void {
  }

}
