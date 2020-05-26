import { Component, OnInit } from '@angular/core';
import { UsersService, ArquitecturesService } from 'src/app/services/services.index';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
 user:any;
  constructor( 
                private _user: UsersService,
                private _arquitecture: ArquitecturesService

  ) { }

  ngOnInit() {
    this.user=this._user.userActive
    this._arquitecture.arquitecturesOfUser=this._arquitecture.getArquitecturesOfUser(this.user._id);
    
    this._arquitecture.getArquitectures()
      .subscribe( data=>{
        // this.arquitectures=data;
        this._arquitecture.freeArquitectures=this.arqFree(data);
        // console.log(this.arquitectures);
      })
  }


  arqFree(arquitectures) {

    return arquitectures.filter(function(arq){
      // console.log(arq);
      return arq.status == 'public';
    }
    )
  }

}
