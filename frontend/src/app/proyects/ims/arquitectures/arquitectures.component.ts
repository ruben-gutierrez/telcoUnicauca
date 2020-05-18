import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ArquitecturesService, UsersService } from 'src/app/services/services.index';
import { Arquitecture } from 'src/app/models/models.index';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-arquitectures',
  templateUrl: './arquitectures.component.html',
  styleUrls: ['./arquitectures.component.css']
})
export class ArquitecturesComponent implements OnInit {
  arquitectures:any;
  constructor(private router: Router, 
    private _arquitecture:ArquitecturesService, 
    private _user:UsersService,
    private toastr:ToastrService) { 

      this._user.getCurrentUser();
      
     }

  ngOnInit() {
    
    this.arquitectures = this._arquitecture.arquitectures
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
