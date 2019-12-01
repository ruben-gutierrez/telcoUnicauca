import { Component, OnInit } from '@angular/core';
import { ArquitectureService } from 'src/app/services/arquitectures.service';
import { UsersService } from "../../../../services/users.service";
@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  tests:any;
  arquitectures:any;
    
  constructor( private _arquitecture:ArquitectureService,
              private _user:UsersService
    ) { 
      
    }

  async ngOnInit() {
     await this.getTests(this._user.userActive._id);
    // console.log(this.tests)
  }
  async getTests(idUser){
    this.arquitectures= await this._arquitecture.getArquitecturesOfUser(idUser)  
    // this.tests=this.arquitectures.tests
  }
  
}
