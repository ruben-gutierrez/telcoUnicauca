import { Component, OnInit } from '@angular/core';
import { TelcoProyectService } from 'src/app/services/services.index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-proyects',
  templateUrl: './admin-proyects.component.html',
  styleUrls: ['./admin-proyects.component.css']
})
export class AdminProyectsComponent implements OnInit {

  proyects:any;
  constructor(private _telcoProyect: TelcoProyectService,
            private toastr: ToastrService,) { }

  ngOnInit() {
    this._telcoProyect.getProyectsTelco()
      .subscribe( data =>{
        this.proyects=data;
      })
  }
  deleteProyect(id,index){
    this._telcoProyect.deleteProyectTelco(id)
      .subscribe(data =>{
        this.proyects.splice( index, 1 ); 
         this.toastr.error("Proyecto Eliminado")
      })
  }
}
