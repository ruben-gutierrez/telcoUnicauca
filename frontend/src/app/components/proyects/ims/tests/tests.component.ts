import { Component, OnInit } from '@angular/core';
import { ArquitectureService } from 'src/app/services/arquitectures.service';
import { UsersService } from "../../../../services/users.service";
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  tests:any;
  arquitectures:any;
  
  idArquitecture:string;
    
  
  constructor( private _arquitecture:ArquitectureService,
              private activateRouter:ActivatedRoute,
              private _user:UsersService
    ) { 
      
      
    }

  async ngOnInit() {
    this.activateRouter.params.subscribe(params =>{
      if (params.id != undefined) {
        this.idArquitecture=params.id;
        this._arquitecture.getArquitecture(this.idArquitecture)
          .subscribe( data =>{
            this.arquitectures=data;
          })
      }else{
        this.idArquitecture='';
        this.getTestsOfUser(this._user.userActive._id)
      }
    })
  }
  async getTestsOfUser(idUser){
      this.arquitectures= await this._arquitecture.getArquitecturesOfUser(idUser)
  }

}
