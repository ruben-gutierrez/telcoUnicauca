import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ArquitectureService } from 'src/app/services/arquitectures.service';
import { Router, ActivatedRoute} from '@angular/router';
import { TestService } from 'src/app/services/tests.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  loading=false;
  arquitectures:any;
  idTest:string;
  test:any;
  fileContent:any;
  flatExecuteTest:boolean=true;
  constructor( private _user:UsersService,
                private _arquitecture:ArquitectureService,
                private _test:TestService,
                private activateRouter:ActivatedRoute,
                private toastr:ToastrService,
                private http:HttpClient )
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
    this.loading=true
    this._test.executeTest(id)
    .subscribe( data =>{
      if (data['status']==200) {
        this.toastr.success("Ejecutando Prueba")
        this.loading=false
       this.test.status='running'
      }else{
       this.toastr.error("Prueba no esta en la base de datos, intentelo más tarde")
       this.loading=false
      }
    })
  }

  stopTest(id){
    this.loading=true
    this._test.stopTest(id)
    .subscribe( data =>{
      if (data['status']==200) {
        this.toastr.success("Prueba detenida")
        this.loading=false
       this.test.status='active'
      }else{
       this.toastr.error("Prueba no esta en la base de datos, intentelo más tarde")
       this.loading=false
      }
    })
  }
  

  saveTest(){

  }
}
