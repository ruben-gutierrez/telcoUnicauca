
import { Component, OnInit } from '@angular/core';
import { ArquitecturesService } from "src/app/services/services.index";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-proyect',
  templateUrl: './admin-proyect.component.html',
  styleUrls: ['./admin-proyect.component.css']
})
export class AdminProyectComponent implements OnInit {
  arquitectures:any;
  constructor( private _arquitectures:ArquitecturesService,
                private toastr: ToastrService) { }

  ngOnInit() {
    this._arquitectures.getArquitectures()
      .subscribe( data =>{
        this.arquitectures= data;
      })
      
  }
  deleteArquitecture(id,index){
    this._arquitectures.deleteArquitecture(id)
      .subscribe( data =>{
        this.arquitectures.splice(index, 1 );
      })
  }
  async freeArquitecture(id, index){
    this.arquitectures[index].status='public'
    await this._arquitectures.dropArquitecture(id)
        .subscribe( data=>{
          
          this.toastr.success("Arquitectura liberada");
        }, error =>{
          this.toastr.error("Error al liberar Arquitectura");
        });
    console.log(this.arquitectures[index])
  }


}
