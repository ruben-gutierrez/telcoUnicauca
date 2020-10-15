import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivationEnd, Router, Routes } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs4g',
  templateUrl: './breadcrumbs4g.component.html',
  styleUrls: ['./breadcrumbs4g.component.css']
})
export class Breadcrumbs4gComponent implements OnInit {

  titlePage:string;
  routePage
  constructor( private router: Router,
    private title: Title,
    private meta: Meta ) { 

     

this.getDataRoute().subscribe( data=>{
this.titlePage = data.titlePage;
this.title.setTitle( 'MOVIL - ' + this.titlePage);
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

