import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-telco',
  templateUrl: './telco.component.html',
  styleUrls: ['./telco.component.css']
})
export class TelcoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
