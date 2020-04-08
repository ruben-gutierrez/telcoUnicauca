import { Component,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  closeResult: string;
  dir:string;
  constructor(private router:Router,
    private activatedRoute: ActivatedRoute) {
   this.dir=this.router.url;
  }
  title = 'frontend';
     
  ngOnInit() {
    
  }
}


