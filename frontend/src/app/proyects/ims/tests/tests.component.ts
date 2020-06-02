import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Arquitecture } from "src/app/models/models.index";
import { ArquitecturesService, TestService, UsersService } from 'src/app/services/services.index';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

  tests:any;
  arquitectures:any;
  
  idArquitecture:string;
    loading:boolean
  
  constructor( private _arquitecture:ArquitecturesService,
              private activateRouter:ActivatedRoute,
              private _test:TestService,
              private toastr:ToastrService,
              private _user:UsersService
    ) {
      this.arquitectures=this._arquitecture.arquitecturesOfUser;
      this._user.getCurrentUser();
      
      this.idArquitecture='';
      this._arquitecture.getArquitecturesOfUser(this._user.userActive._id)
      .then( data =>{
        
        this.arquitectures=data
      })
    }

  async ngOnInit() {
    
    
    // this.activateRouter.params.subscribe(params =>{
    //   if (params.id) {
    //     this.idArquitecture=params.id;
    //     this._arquitecture.getArquitecture(this.idArquitecture)
    //       .subscribe( data =>{
            
    //         if(data['status'] ==200){
    //           this.arquitectures=data['content'];
             
    //         }
    //       })
    //   }else{
    //     this.idArquitecture='';
    //    this._arquitecture.getArquitecturesOfUser(this._user.userActive._id)
    //    .then( data =>{
         
    //      this.arquitectures=data
    //    })
    //   }
    // })
   
   
  }
  async getTestsOfUser(idUser){
      this.arquitectures= await this._arquitecture.getArquitecturesOfUser(idUser)
  }

  async executeTest(id,indexTest,indexArq){
    this.loading=true
   this._test.executeTest(id)
   .subscribe(data=>{
     console.log(data)
     if (data['status']==200) {
       this.toastr.success("Ejecutando Prueba")
       this.loading=false
       this.arquitectures[indexArq].tests[indexTest].status="running"
     }else{
      this.toastr.error("Prueba no esta en la base de datos, intentelo más tarde")
      this.loading=false
     }
   })
  }
  async stopTest(id,indexTest,indexArq){
    this.loading=true
   this._test.stopTest(id)
   .subscribe(data=>{
     if (data['status']==200) {
       this.toastr.success("Prueba detenida")
       this.loading=false
       this.arquitectures[indexArq].tests[indexTest].status="active"
     }else{
      this.toastr.error("Prueba no esta en la base de datos, intentelo más tarde")
      this.loading=false
     }
   })
  }
  async deleteTest(id,indexTest,indexArq){
    this.loading=true
    this._test.deleteTest(id)
    .subscribe(data=>{
      // console.log(data)
      if (data['status']==200) {
        this.toastr.success("Prueba eliminada")
        // console.log( indexArq, indexTest)
        
        this.arquitectures[indexArq].tests.splice(indexTest,1)
        this.loading=false
      }else{
       this.toastr.error("Error al eliminar la prueba, intentelo más tarde")
       this.loading=false
      }
    })
  }

}
