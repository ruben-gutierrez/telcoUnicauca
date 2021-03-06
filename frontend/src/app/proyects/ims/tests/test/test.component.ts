import { Component, OnInit } from '@angular/core';
import { UsersService, ArquitecturesService, TestService, ServerService } from 'src/app/services/services.index';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  urlTerminal:string;
  arquitectures:any;
  idTest:string;
  test:any;
  fileContent:any;
  flatExecuteTest:boolean=true;
  constructor( private _user:UsersService,
                private _arquitecture:ArquitecturesService,
                private _test:TestService,
                private activateRouter:ActivatedRoute,
                private toastr:ToastrService,
                private http:HttpClient,
                private _server: ServerService )
   { 
    this.activateRouter.params.subscribe(params =>{
      this.idTest=params.id;
      // console.log(this.idTest)
    })
  }
  async ngOnInit() {
    
    await this._test.getTest(this.idTest)
      .subscribe( data =>{
        this.test=data;
        console.log(this.test)
        this.getArquitecture(this.test.idArquitecture)
    });
    
    this._test.getTestData(this.idTest)
    .subscribe(data =>{
      this.fileContent=data['content'];
    })

  }

  editTest(formEditTest){
    
    // console.log(formEditTest.value)
    this._test.updateTestFile(formEditTest.value)
    .subscribe( data =>{
      console.log(data)
    })
    if (this.flatExecuteTest == true) {
      this.flatExecuteTest=false
    }else{
      this.flatExecuteTest=true
    }
  }
  showEditTest($event){
    // $event.preventDefault();
    // console.log(formEditTest.value)
    
    if (this.flatExecuteTest == true) {
      this.flatExecuteTest=false
    }else{
      this.flatExecuteTest=true
    }
  }


  executeTest(id,formEditTest){
    console.log(formEditTest.value)
    
    this._test.executeTest(id)
    .subscribe( data =>{
      if (data['status']==200) {
        this.toastr.success("Ejecutando Prueba")
       
       this.test.status='running'
      }else{
       this.toastr.error("Prueba no esta en la base de datos, intentelo más tarde")
      
      }
    })
  }

  stopTest(id){
    
    this._test.stopTest(id)
    .subscribe( data =>{
      if (data['status']==200) {
        this.toastr.success("Prueba detenida")
       
       this.test.status='active'
      }else{
       this.toastr.error("Prueba no esta en la base de datos, intentelo más tarde")
      
      }
    })
  }

  getArquitecture(id){
    this._arquitecture.getArquitecture(id)
    .subscribe( data =>{
      // console.log(data['content'].vmCoreIMS)
      data['content'].vmCoreIMS.forEach(element => {
        if( element.name == 'sipp'){
          // console.log(element)
          this._server.actionsServer(element._id,'console')
          .subscribe( data =>{
            // this.toastr.warning('Consola valida por 1 Hora');
            this.urlTerminal=data['consoleLink']  
            // console.log(this.urlTerminal) 
          })
        }
        
        
      });
      
    })

  }
  

  saveTest(){

  }

}
