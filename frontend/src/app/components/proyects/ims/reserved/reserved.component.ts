import { Component, OnInit } from '@angular/core';
import { ArquitectureService } from 'src/app/services/arquitectures.service';
import { Arquitecture } from 'src/app/models/arquitecture';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.css']
})
export class ReservedComponent implements OnInit {
  arquitectures:any;
  constructor(private router: Router, 
    private _arquitecture:ArquitectureService, 
    private _user:UsersService,
    private toastr:ToastrService) { }

  ngOnInit() {
    this._arquitecture.getArquitectures()
      .subscribe( data=>{
        // this.arquitectures=data;
        this.arquitectures = this.arqReserved(data, this._user.userActive._id);
        // console.log(data);
        
      })
  }
  async dropArq (id) {
    // console.log(id);
    
       
       
        await this._arquitecture.dropArquitecture(id)
        .subscribe( data=>{
          console.log(data)
          this.ngOnInit();
          this.toastr.success("Arquitectura liberada");
        }, error =>{
          this.toastr.error("Error al liberar Arquitectura");
        });
  }
  
  arqReserved(arquitectures, idUser) {

  return arquitectures.filter(function(arq){
    // console.log(arq);
    return arq.status == idUser;
  })
  
 


}


}
