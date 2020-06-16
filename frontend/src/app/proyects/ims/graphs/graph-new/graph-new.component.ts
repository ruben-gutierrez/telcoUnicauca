
import { Component, OnInit, Input } from '@angular/core';
import { ArquitecturesService, ServerService,UsersService, GraphsService } from 'src/app/services/services.index';
import { Location } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graph-new',
  templateUrl: './graph-new.component.html',
  styleUrls: ['./graph-new.component.css']
})
export class GraphNewComponent implements OnInit {
  @Input() idArqui:string
  @Input() idServer:string
  server:Object
  servers=[]
  arquitecture:Object
  arquitectures:Object
  typeGraphsServer=[]

  loading=false;
  formNewGraph:FormGroup;
 user:User;

  constructor(
                private router: Router,
                private _arquitecture:ArquitecturesService,
                private _server: ServerService,
                private _user: UsersService,
                private toastr: ToastrService,
                private _graph: GraphsService,
                private _location: Location
  ) {

   }

  ngOnInit() {
    this.user=this._user.getCurrentUser()
    this.formNewGraph= new FormGroup({
      idArquitecture: new FormControl(null),
      idServer: new FormControl(null),
      name: new FormControl(null),
      idTemplate: new FormControl(null),
    })

         this._arquitecture.getArquitecturesOfUser(this.user._id)
         .then( data =>{
           this.arquitectures=data
           
         })
   

  }

  // updateServers(idArq){
  //   this._arquitecture.getArquitecture(idArq)
  //   .subscribe( data=>{
  //     data['content'].vmCoreIMS.forEach(vm => {
  //       this.servers.push(vm)
  //     });
  //     data['content'].vmAditionals.forEach(vm => {
  //       this.servers.push(vm)
  //     });
  //   })
  // }
  updateServers(){
    this._arquitecture.getArquitecture(this.formNewGraph.value.idArquitecture)
      .subscribe( data=>{
        data['content'].vmCoreIMS.forEach(vm => {
          this.servers.push(vm)
        });
        data['content'].vmAditionals.forEach(vm => {
          this.servers.push(vm)
        });
        // console.log(this.servers)
      })
   
  }

  // upgradeGraphs(idServer){
  //   this._graph.getGraphTypes(idServer)
  //   .subscribe( data =>{
  
  //     if (data['status'] == 200 ) {
  //       this.typeGraphsServer=data['content']
        
  //     }
  //   })
  // }
  upgradeGraphs(){
    this._graph.getGraphTypes(this.formNewGraph.value.idServer)
    .subscribe( data =>{
  
      if (data['status'] == 200 ) {
        this.typeGraphsServer=data['content']
        // console.log(this.typeGraphsServer)
      }
    })
  }

  newGraph(){
    this.loading=true;
    // console.log(this.formNewGraph.value)
   this._graph.createGraph(this.formNewGraph)
   .subscribe(data =>{
     console.log(data)
     if ( data['status'] == 200 ) {
       this.toastr.success("Gráfica creada")
       this.loading=false;
      
      this.router.navigate(['/ims/graphs/'+data['content']._id])
     }else{
      
      this.toastr.error(data['answer'])
      
      this.loading=false;
     }
   })
  }

}
