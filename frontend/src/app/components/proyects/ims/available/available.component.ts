import { Component, OnInit } from '@angular/core';
import { Arquitecture } from 'src/app/models/arquitecture';
import { ArquitectureService } from 'src/app/services/arquitectures.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css']
})
export class AvailableComponent implements OnInit {
  arquitectures:any;
  
  constructor( private router: Router, 
          private _arquitecture:ArquitectureService, 
          private _user:UsersService,
          private toastr:ToastrService ) { }
  
  ngOnInit() {
    this._arquitecture.getArquitectures()
      .subscribe( data=>{
        // this.arquitectures=data;
        this.arquitectures=this.arqFree(data);
        // console.log(data);
        
      })
    
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
          this.router.navigate(["/ims/reserved"]);
        }, error =>{
          this.toastr.error("Error2 al reservar Arquitectura");
        }
        )
      }else{
        this.toastr.error("Error al reservar Arquitectura");
      }
      
  }

  arqFree(arquitectures) {

    return arquitectures.filter(function(arq){
      // console.log(arq);
      return arq.status == 'public';
    }
    )
  }
}
