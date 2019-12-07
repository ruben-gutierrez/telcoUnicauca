import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArquitectureService } from 'src/app/services/arquitectures.service';
import { UsersService } from 'src/app/services/users.service';
import { ServersService } from 'src/app/services/servers.service';
import { Router, ActivatedRoute} from '@angular/router';
import { async } from 'q';



@Component({
  selector: 'app-arquitecture-ims',
  templateUrl: './arquitecture-ims.component.html',
  styleUrls: ['./arquitecture-ims.component.css']
})
export class ArquitectureImsComponent implements OnInit {
  arquitecture: any;
  vmsCore: any;
  vmsAditionals: any;
  idArquitecture:string;
  status:boolean=true;


  constructor( private router: Router, 
              private _arquitecture:ArquitectureService, 
              private _user:UsersService,
              private _server:ServersService,
              private activatedRouter:ActivatedRoute,
              private toastr:ToastrService ) 
    {
      this.activatedRouter.params.subscribe( params =>{
       this.idArquitecture = params.id;
      })
     }

  async ngOnInit() {

    await this.getArquitecture(this.idArquitecture);
    // console.log(this.arquitecture.vmCoreIMS); 
    this.vmsCore=this.arquitecture['vmCoreIMS'];
    console.log(this.vmsCore)
    this.vmsAditionals=this.arquitecture.vmAditionals;
  }

  async getArquitecture(id){
   await this._arquitecture.getArquitecture(id)
         .toPromise( )
         .then(data =>{
          this.arquitecture = data;
         })
  }

  powerServer(id){
    this._server.actionsServer(id,'on/off')
      .subscribe( data =>{
        this.toastr.success('Accion exitosa')
      }, error=>{
        this.toastr.error('Error al apagar la máquina')
      })
      
      
      
  }
  instantServer(id){
    this._server.actionsServer(id,'instant')
      .subscribe( data =>{
        this.toastr.success('Accion exitosa');
      }, error=>{
        this.toastr.error('Error al tomar instantanea la máquina');
      })
  }
  deleteServer(id){
    this._server.actionsServer(id,'delete')
      .subscribe( data =>{
        this.toastr.success('Accion exitosa');
      }, error=>{
        this.toastr.error('Error al eliminar la máquina');
      })
  }
  returnServer(id){
    this._server.actionsServer(id,'rebuild')
      .subscribe( data =>{
        this.toastr.success('Accion exitosa');
      }, error=>{
        this.toastr.error('Error al reestablecer la máquina');
      })
  }
  resizeServer(id){
    // console.log(id)
    let dataForm = {};
    this._server.actionsServer(id,'rebuild',dataForm)
      .subscribe( data =>{
        this.toastr.success('Accion exitosa');
      }, error=>{
        this.toastr.error('Error al reestablecer la máquina');
      })


    document.getElementById('divRedimencion'+id).style.display="none";
    document.getElementById('btnRedimencion'+id).style.display = "";
  }
  consoleServer(id){
    this._server.actionsServer(id,'console')
      .subscribe( data =>{
        console.log(data);
        this.toastr.success('Consola valida por 1 Hora');
      }, error=>{
        this.toastr.error('Error al lanzar la consola');
      })
  }
  seeFormEditVm(id){
    document.getElementById('btnRedimencion'+id).style.display="none";
    document.getElementById('divRedimencion'+id).style.display = "";
    
  }
  hideFormEditVm(id){
    document.getElementById('btnRedimencion'+id).style.display="";
    document.getElementById('divRedimencion'+id).style.display = "none";
  }
}
