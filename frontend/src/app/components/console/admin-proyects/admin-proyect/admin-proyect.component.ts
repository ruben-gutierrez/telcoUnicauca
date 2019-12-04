import { Component, OnInit } from '@angular/core';
import { ArquitectureService } from "../../../../services/arquitectures.service";
@Component({
  selector: 'app-admin-proyect',
  templateUrl: './admin-proyect.component.html',
  styleUrls: ['./admin-proyect.component.css']
})
export class AdminProyectComponent implements OnInit {
    arquitectures:any;

  constructor( private _arquitectures:ArquitectureService) { }

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
  freeArquitecture(id, index){
    this.arquitectures[index].status='public'
    console.log(this.arquitectures[index])
  }

}
