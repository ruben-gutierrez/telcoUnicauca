import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { filter, map } from "rxjs/operators";
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

declare function init_plugins();
@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent implements OnInit {
  titlePage:string;
  routePage
  arrayRoute=[];
  proyect:string;
  constructor( private router:Router,
                private title: Title,
                private meta: Meta
    ) {
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
        // console.log(data['_routerState'].url)
        this.arrayRoute=data['_routerState'].url.split("/")
        this.proyect=this.arrayRoute['1']
        // this.routePage=data.url;
        this.routePage=this.arrayRoute
      })
    
    
     }

  ngOnInit() {
    init_plugins();
    
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
}