import { Component, OnInit, ViewChild, Input,ElementRef,AfterViewInit, OnChanges } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnChanges {
  @ViewChild('loading',{static: false}) loading: ElementRef;
  @Input() public state: boolean;
  constructor(private modalService: NgbModal,
    config: NgbModalConfig) {
      config.backdrop = 'static';
      config.keyboard = false;
     }

  ngOnChanges() {
    if (this.state) {
      this.modalService.open(this.loading, { size: 'sm' })
    }else{
      this.modalService.dismissAll('finaly')
    }
  }
  
  
}
