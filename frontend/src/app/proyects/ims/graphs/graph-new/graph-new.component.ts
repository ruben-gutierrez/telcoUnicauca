
import { Component, OnInit, Input } from '@angular/core';
import { ArquitecturesService, ServerService,UsersService, GraphsService } from 'src/app/services/services.index';

import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-graph-new',
  templateUrl: './graph-new.component.html',
  styleUrls: ['./graph-new.component.css']
})
export class GraphNewComponent implements OnInit {
  @Input() idArquitecture:string
  @Input() idServer:string
  server:Object
  servers=[]
  arquitecture:Object
  arquitectures:Object
  typeGraphsServer=[]


  formNewGraph:FormGroup;
 user:User;

  constructor(
                private _arquitecture:ArquitecturesService,
                private _server: ServerService,
                private _user: UsersService,
                private toastr: ToastrService,
                private _graph: GraphsService
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

  updateServers(idArq){
    this._arquitecture.getArquitecture(idArq)
    .subscribe( data=>{
      data['content'].vmCoreIMS.forEach(vm => {
        this.servers.push(vm)
      });
      data['content'].vmAditionals.forEach(vm => {
        this.servers.push(vm)
      });
    })
  }

  upgradeGraphs(idServer){
    this._graph.getGraphTypes(idServer)
    .subscribe( data =>{
  
      if (data['status'] == 200 ) {
        this.typeGraphsServer=data['content']
        
      }
    })
  }

  newGraph(){
   this._graph.createGraph(this.formNewGraph)
   .subscribe(data =>{
     if ( data['status'] == 200 ) {
       this.toastr.success("Gráfica creada")
     }
   })
  }

}
