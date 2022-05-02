import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormControl, Validators, Form, FormsModule } from "@angular/forms";
import { UsersService, ServerService,ArquitecturesService, OpenstackQueriesService, MachinesMovilService } from 'src/app/services/services.index';
import { User } from 'src/app/models/models.index';
import { Location } from '@angular/common';


import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { async } from '@angular/core/testing';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';



@Component({
  selector: 'app-gestorpruebasmovil',
  templateUrl: './gestorpruebasmovil.component.html',
  styleUrls: ['./gestorpruebasmovil.component.css']
})
export class GestorpruebasmovilComponent implements OnInit {
  machines:any;
  closeResult = '';
  modal:NgbModalRef;
  messageLoading:string;
  //maquina virtual
  resourcesFlavor
  loading=false;
  idMachine:string;
  arquitecture: any;
  showcore:boolean=true;
  formNewServer: FormGroup;
  images:object;
  flavors:object;
  core:any;
  vmsAditionals: any;
  //crearmaquina
  procesador=0;
  almacenamiento=0;
  ram=0;
  resourcesDisp={
    ram : 0,
    vcpus:0,
    disk:0,
    vms:0,
    status: false
  
  }
  vmDelete={
    idVm:"",
    nameVm:"",
    index:""
  }
  constructor(private modalService:NgbModal,
    private activatedRouter: ActivatedRoute,
       // private _arquitecture: ArquitecturesService,
        private _server: ServerService,
        private toastr: ToastrService,
        private router: Router,
        private _openstack: OpenstackQueriesService,
        private _machineMovil: MachinesMovilService,
        private _location: Location)  { 
          this.activatedRouter.params.subscribe( params =>{
          this.idMachine = params.id;
          this.getMachines();
         })
        
       }
       

  async ngOnInit() {
    this.formNewServer = new FormGroup({
      idArq: new FormControl( 'machineProyectMovil'),
      name: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      flavor:new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      cpu: new FormControl('1', Validators.required),
      ram: new FormControl('4', Validators.required),
      disk : new FormControl('40', Validators.required),

    })
     //await this.getMachine(this.idMachine);
    
   
    await this.consultImages(); 
  
    this.getMachines();   
  }

  open(content) {
  this.modalService.open(content, {size:'lg', windowClass: 'modal-img',ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async consultImages(){
    this._openstack.getImages()
    .subscribe( response =>{
      this.images=response;
    })
  }

  consultFlavor(id){
    // this.resourcesFlavor=id
    this._openstack.showFlavor(id)
    .subscribe( data =>{
      console.log(data)
      this.resourcesFlavor="RAM:"+data['flavor'].ram+"Mb  --> Procesadores: "+data['flavor'].vcpus + " --> Almacenamiento: "+data['flavor'].disk+"Gb"
      this.resourcesDisp.ram += data['flavor'].ram;
      this.resourcesDisp.disk +=  data['flavor'].disk;
      this.resourcesDisp.vcpus += data['flavor'].vcpus;
      console.log("entro al flavor"); 
    })
  // return  this.resourcesDisp.vcpus, this.resourcesDisp.disk, this.resourcesDisp.vcpus
    
  }

 
  
  async newServer(){   
    this.loading=true;
    this.messageLoading="Creando Servidor"
    // this.modalService.open(content, { size: 'sm' })
    // document.getElementById('btnclose').click();
    await this._machineMovil.createMachine(this.formNewServer.value)
    // await this._machineMovil.addMachineOp(this.formNewServer.value)
    .subscribe(async response =>{
      this.loading=false
      if(response['status']==200){
        this.toastr.success('Máquina virtual creada')
        this.ngOnInit();
        this.modalService.dismissAll();
        //this.arquitecture.vmAditionals.push(response['content'])
        //this.core=this.arquitecture.vmAditionals;
        //this.resourcesDisp=await this.resourceDisp(this.arquitecture);
        //this._location.back();
      }
      else{
        this.toastr.success('Error al crear la máquina virtual')  
      }
    }
      )
    
  }


  async getMachine(id){
    await this._machineMovil.getMachine(id)
    .toPromise()
    .then(data =>{
      if(data['status']==200){
        this.arquitecture = data['content'];


      }else{
        this.toastr.error('la base de datos esta temporalemnte fuera de servicio')
        this.arquitecture=[]
      }
    })

  }

  async resourceDisp(arquitecture){
    let resorceDIsp={
      ram:0,
      vcpus:0,
      disk:0,
      vms:0,
      status:false
    }
    if(arquitecture.vmAditionals.length >0){
      for await (let vm of arquitecture.vmAditionals){
        await this._openstack.showFlavor(vm.infoServe.flavor.id)
        .toPromise()
        .then(data =>{
          resorceDIsp.ram += data['flavor'].ram;
          resorceDIsp.disk += data ['flavor'].disk;
          resorceDIsp.vcpus += data ['flavor'].vcpus;

        })
      }
    }

    resorceDIsp.ram = arquitecture.maxRAM - resorceDIsp.ram;
    resorceDIsp.disk = arquitecture.maxHDD - resorceDIsp.disk ;
    resorceDIsp.vcpus = arquitecture.maxCore - resorceDIsp.vcpus;
    resorceDIsp.vms= arquitecture.maxVM- arquitecture.vmCoreIMS.length
    if (resorceDIsp.ram > 0 && resorceDIsp.disk > 0 && resorceDIsp.vcpus > 0 && resorceDIsp.vms >> 0 ) {
      resorceDIsp.status= true;
    }
    return resorceDIsp;


  }



  getMachines(){
    this._machineMovil.getMachines()
      .subscribe((data: any) => {
        this.machines = data;
        var dir='movil-net';
        // console.log('FECHA OAI',this.machines[0].infoServer.created);
        // console.log('id OAI',this.machines[0].infoServer.id);
        console.log('ram OAI',this.machines[0].infoServer.flavor.id);
        console.log('cpu OAI',this.machines[0].infoServer.flavor.id);
        console.log('ip OAI',this.machines[0].infoServer.addresses.movil);
        // console.log('estado OAI',this.machines[0].infoServer.status);
        var ram=0;
        


    });  
  }
   updateProc(val){
     this.procesador=val.target.value;

  }
  updateRam(val){
    this.ram=val.target.value;

 }
 updateAlm(val){
  this.almacenamiento=val.target.value;

}

  
  deleteMachine(id:string, index){
    // console.log(id);
    this.loading=true
    this.messageLoading="Borrando servidor"
    this._server.actionsServer(id,'delete', null,)
    //this._machineMovil.deleteMachine(id)
      .subscribe( res =>{
        var i = this.machines.indexOf( id );
        this.machines.splice(index, 1 );
        this.toastr.success("maquina eliminada")
        this.loading=false;
        // console.log(this.users);
        // console.log(i);
      });
  }
  setInfoVmDelete(idVm, index){
    this.vmDelete={
      idVm:idVm,
      nameVm:"",      
      index:index
    }
    console.log("va a eliminar")
    
    this._machineMovil.getServer(idVm).subscribe( 
      data =>{
        this.vmDelete.nameVm=data['content'].name
        console.log("elimino")
      })      
  }
  powerServer(id){    
    this.loading=true
    this._server.actionsServer(id,'on/off')
      .subscribe( data =>{
        this.loading=false;
        if (data['action']== 'off') {
          this.toastr.success('La mv se ha apagado correctamente')
          
        }else{
          this.toastr.success('La mv se ha encendido correctamente')

        }
      }, error=>{
        this.loading=false;
        this.toastr.error('Error al apagar la máquina')
      })
  }
  consoleServer(id){
    this.loading=true;
    this.messageLoading="Creando consola; recuerde que se habilita por 1 hora"
    this._server.actionsServer(id,'console')
      .subscribe( data =>{
        this.toastr.success('Consola creada, verifique la creación de nuevas pestañas');
        this.toastr.warning('Consola valida por 1 Hora');
        
        this.loading=false;
        window.open(data['consoleLink'],'_blank');  
        
      }, error=>{
        this.toastr.error('Error al lanzar la consola');
        this.loading=false;
      })
  }


  // await this._arquitecture.dropArquitecture(id)
  // .subscribe( data=>{
  //   // console.log(data)
  //   this.ngOnInit();
  //   this.toastr.success("Arquitectura liberada");
  // }, error =>{
  //   this.toastr.error("Error al liberar Arquitectura");
  // });

 

}
