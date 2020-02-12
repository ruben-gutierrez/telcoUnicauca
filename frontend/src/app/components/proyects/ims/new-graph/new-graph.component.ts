import { Component, OnInit, Input } from '@angular/core';
import { ArquitectureService } from 'src/app/services/arquitectures.service';
import { ServersService } from 'src/app/services/servers.service';
import { UsersService } from 'src/app/services/users.service';
import { GraphService } from 'src/app/services/graphs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-graph',
  templateUrl: './new-graph.component.html',
  styleUrls: ['./new-graph.component.css']
})
export class NewGraphComponent implements OnInit {
  @Input() idArquitecture:string
  @Input() idServer:string
  server:Object
  servers=[]
  arquitecture:Object
  arquitectures:Object
  typeGraphsServer=[]
  constructor( private _arquitecture:ArquitectureService,
                private _server: ServersService,
                private _user: UsersService,
                private toastr: ToastrService,
                private _graph: GraphService ) { }

  ngOnInit() {
    if (this.idServer) {
      this._server.getServer(this.idServer)
      .subscribe( data =>{
       this.server=data['content']
      })
    }else{
      if ( this.idArquitecture ) {
        this._arquitecture.getArquitecture(this.idArquitecture)
        .subscribe( data =>{
         if (data['status']== 200) {
           this.arquitecture=data['content']
           data['content'].vmCoreIMS.forEach(vm => {
             this.servers.push(vm)
           });
           data['content'].vmAditionals.forEach(vm => {
             this.servers.push(vm)
           });
         }
        })
         
       }else{
         this._arquitecture.getArquitecturesOfUser(this._user.userActive._id)
         .then( data =>{
           this.arquitectures=data
         })
   
         
       }
    }


    
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

  newGraph(formNewGraph){
   this._graph.createGraph(formNewGraph)
   .subscribe(data =>{
     if ( data['status'] == 200 ) {
       this.toastr.success("Gráfica creada")
     }
   })
  }

}
