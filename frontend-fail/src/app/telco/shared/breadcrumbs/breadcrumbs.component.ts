import { Component, OnInit } from '@angular/core';
import { MetaDefinition, Title, Meta } from '@angular/platform-browser';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from "rxjs/operators";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  titlePage:string;
  routePage
  constructor( private router:Router,
              private title: Title,
              private meta: Meta ) { 
   
    this.getDataRoute().subscribe( data=>{
      this.titlePage = data.titlePage;
      this.title.setTitle( 'Telco - ' + this.titlePage);
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titlePage
      }

      this.meta.updateTag( metaTag);
    })
  
    this.getURLRoute().subscribe( data=>{
      this.routePage=data.url;
    })

   
    
  }
  getDataRoute(){
    return  this.router.events.pipe(

      filter( event=>event instanceof ActivationEnd),
      filter( (event:ActivationEnd) => event.snapshot.firstChild === null),
      map( (event:ActivationEnd) => event.snapshot.data )
      )
  }
  getURLRoute(){
    return  this.router.events.pipe(

      filter( event=>event instanceof ActivationEnd),
      filter( (event:ActivationEnd) => event.snapshot.firstChild === null),
      map( (event:ActivationEnd) => event.snapshot )
      )
  }
  
  ngOnInit() {
  }

}
