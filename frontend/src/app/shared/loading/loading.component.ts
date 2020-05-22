import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  @ViewChild('loading',{static: false}) loading: ElementRef;
  @Input() public state: boolean;
  constructor( ) { 
     
    }

  ngOnInit(): void {
    
  }

}
