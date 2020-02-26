import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ArquitectureService } from 'src/app/services/arquitectures.service';
import { Router, ActivatedRoute} from '@angular/router';
import { TestService } from 'src/app/services/tests.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  
  arquitectures:any;
  idTest:string;
  test:any;
  fileContent:any;
  flatExecuteTest:boolean=true;
  constructor( private _user:UsersService,
                private _arquitecture:ArquitectureService,
                private _test:TestService,
                private activateRouter:ActivatedRoute,
                private http:HttpClient )
   { 
    this.activateRouter.params.subscribe(params =>{
      this.idTest=params.id;
    })
  }

  async ngOnInit() {
    await this._test.getTest(this.idTest)
      .subscribe( data =>{
        // console.log(data)
        this.test=data;
    });
    this._test.getTestData(this.idTest)
    this.http.get("assets/filesXML/"+this.test.file+".xml", { responseType: 'text' }).subscribe(data => {
      this.fileContent=data;
    })
  }

  editTest(){
    if (this.flatExecuteTest == true) {
      this.flatExecuteTest=false
    }else{
      this.flatExecuteTest=true
    }
  }
  

  saveTest(){

  }
}
