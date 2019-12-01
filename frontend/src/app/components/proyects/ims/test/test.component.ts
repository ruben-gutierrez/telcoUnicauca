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
    this.http.get("assets/filesXML/testBONO.xml", { responseType: 'text' }).subscribe(data => {
      this.fileContent=data;
    })
    // this.http.get('assets/filesXML/testBONO.xml')
    //   .subscribe(data => {
    //         console.log( 'data', data);
    //   },error=>{
    //     console.log(error)
    //   })
    
  //   this._test.getTests()
  //     .subscribe( data => {
  //       console.log(data)
  //     })
  // this.arquitectures = await this.getArquitectures(this._user.userActive._id);

    
  // console.log(this.arquitectures)

  }
  // async getArquitectures(idUser){
  //   return await this._arquitecture.getArquitecturesOfUser(idUser);
  // }
}
