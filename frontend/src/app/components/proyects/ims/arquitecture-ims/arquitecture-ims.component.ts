import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArquitectureService } from 'src/app/services/arquitectures.service';
import { UsersService } from 'src/app/services/users.service';
import { ServersService } from 'src/app/services/servers.service';
import { OpenstackQueriesService } from 'src/app/services/openstack-queries.service';
import { Router, ActivatedRoute} from '@angular/router';
import { async } from 'q';



@Component({
  selector: 'app-arquitecture-ims',
  templateUrl: './arquitecture-ims.component.html',
  styleUrls: ['./arquitecture-ims.component.css']
})

export class ArquitectureImsComponent implements OnInit {
images:object;
  arquitecture: any;
 showcore:boolean=true;
 core:any;
  vmsAditionals: any;
  idArquitecture:string;
  status:boolean=true;
  resourcesDisp={
    ram : 0,
    vcpus:0,
    disk:0,
    vms:0,
    status: false
  }

  
  constructor( private router: Router, 
              private _arquitecture:ArquitectureService, 
              private _user:UsersService,
              private _server:ServersService,
              private _openstack:OpenstackQueriesService,
              private activatedRouter:ActivatedRoute,
              private toastr:ToastrService ) 
    {
      this.activatedRouter.params.subscribe( params =>{
       this.idArquitecture = params.id;
      })
     }
 

  async ngOnInit() {
    await this.getArquitecture(this.idArquitecture);
    // console.log(this.arquitecture)
    
    this.vmsAditionals=this.arquitecture.vmAditionals;
    
    this.resourcesDisp=await this.resourceDisp(this.arquitecture);
    // console.log(this.resourcesDisp)
    this.core=this.arquitecture.vmCoreIMS;
    // console.log(this.resourcesDisp)
    await this.consultImages();
    
    
  }

  async consultImages(){
    this._openstack.getImages()
      .subscribe( response =>{
        this.images=response;
      })
  }

  showims(){
    this.core=this.arquitecture.vmCoreIMS;
  }
  showaditional(){
    this.core=this.arquitecture.vmAditionals;
  }

  async newServer(formNewServer){
   
    document.getElementById('btnclose').click();
    await this._server.addServerArquitecture(formNewServer.value) 
      .subscribe( response =>{
        // console.log(response)
        if (response['status'] == 200) {
          this.getArquitecture(this.idArquitecture);
          this.toastr.success('Máquina virtual creada')
          this.arquitecture.vmAditionals.push(response['content'])
          this.core=this.arquitecture.vmAditionals;
          
        }else{
          this.toastr.success('Error al crear la máquina virtual')
          
        }
       
      })
      this.resourcesDisp=await this.resourceDisp(this.arquitecture);
    
  }

  async resourceDisp(arquitecture){
    let resourcesDisp={
      ram : 0,
      vcpus:0,
      disk:0,
      vms:0,
      status: false
    }
    if (arquitecture.vmAditionals.length > 0) {
      for await ( let vm of arquitecture.vmAditionals){
        await this._openstack.showFlavor(vm.infoServer.flavor.id)
          .toPromise()
          .then( data=>{
            resourcesDisp.ram += data['flavor'].ram;
            resourcesDisp.disk +=  data['flavor'].disk;
            resourcesDisp.vcpus += data['flavor'].vcpus;
            
          })
  
      }
    }
    // console.log("recuross usados", resourcesDisp)
    // console.log("disco", arquitecture.maxHDD)
    
    // this.resourcesDisp.ram = this.resourcesDisp.ram  + 11; 
    
    
    resourcesDisp.ram = arquitecture.maxRAM - resourcesDisp.ram;
    resourcesDisp.disk = arquitecture.maxHDD - resourcesDisp.disk ;
    resourcesDisp.vcpus = arquitecture.maxCore - resourcesDisp.vcpus;
    resourcesDisp.vms= arquitecture.maxVM- arquitecture.vmCoreIMS.length
    if (resourcesDisp.ram > 0 && resourcesDisp.disk > 0 && resourcesDisp.vcpus > 0 && resourcesDisp.vms >> 0 ) {
      resourcesDisp.status= true;
    }
    return resourcesDisp;
  }
  async getArquitecture(id){  
   await this._arquitecture.getArquitecture(id)
         .toPromise( )
         .then(data =>{
         if(data['status']==200){
          this.arquitecture = data['content'];
         }
          
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
  async deleteServer(id,idArquitecture,index){
    // console.log(id)
    this._server.actionsServer(id,'delete',idArquitecture)
      .subscribe( data =>{
        this.toastr.success('VM '+id+' Eliminada');
        this.arquitecture.vmCoreIMS.splice( index, 1 ); 
        // this.getArquitecture(idArquitecture)
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
  resizeServer(form, id){
    let dataForm = form.value;
    this._server.actionsServer(id,'resize', '',dataForm)
      .subscribe( data =>{
        
        this.toastr.success('Accion exitosa');
      }, error=>{
        // console.log(error)
        this.toastr.error('Error al reestablecer la máquina');
      })


     document.getElementById('divRedimencion'+id).style.display="none";
     document.getElementById('btnRedimencion'+id).style.display = "";
  }
  consoleServer(id){
    this._server.actionsServer(id,'console')
      .subscribe( data =>{
        this.toastr.success('Consola valida por 1 Hora');
        window.open(data['consoleLink'],'_blank');  
        
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
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
 
}
