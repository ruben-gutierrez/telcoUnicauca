import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-telco',
  templateUrl: './header-telco.component.html',
  styleUrls: ['./header-telco.component.css']
})
export class HeaderTelcoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
