import { Component, OnInit } from '@angular/core';

// Modules
import { Arquitecture } from 'src/app/models/models.index';
import { ArquitecturesService } from 'src/app/services/services.index';
import { UsersService } from 'src/app/services/services.index';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css']
})
export class AvailableComponent implements OnInit {
  // arquitectures:Arquitecture;
  arquitectures:any;
  constructor(  private router: Router, 
                private _arquitecture:ArquitecturesService, 
                private _user:UsersService,
                private toastr:ToastrService) { }

  ngOnInit() {
    
    this.arquitectures=this._arquitecture.freeArquitectures
    this._arquitecture.getArquitectures()
      .subscribe( data=>{
        // this.arquitectures=data;
        this.arquitectures=this.arqFree(data);
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

  async reserve(idArquitecture){
    let arquitecture;
     await this._arquitecture.getArquitecture(idArquitecture)
      .toPromise()
      .then(data => {
       
        arquitecture=data;
      })
      .catch(error=>{
        arquitecture = error;
      });
     
      if (arquitecture.content['status'] == 'public') {
        arquitecture.content['status']= this._user.userActive._id;
        await this._arquitecture.updateArquitecture(arquitecture.content)
        .subscribe( data=>{
          this.toastr.success("Arquitectura reservada");
          this.router.navigate(["/ims/arquitectures"]);
        }, error =>{
          this.toastr.error("Error2 al reservar Arquitectura");
        }
        )
      }else{
        this.toastr.error("Error al reservar Arquitectura");
      }
      
  }

}
