import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { filter, map } from "rxjs/operators";
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

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
this.title.setTitle( 'IMS - ' + this.titlePage);
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
