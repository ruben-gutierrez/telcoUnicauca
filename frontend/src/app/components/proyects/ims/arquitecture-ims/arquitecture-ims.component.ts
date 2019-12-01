import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArquitectureService } from 'src/app/services/arquitectures.service';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute} from '@angular/router';
import { async } from 'q';



@Component({
  selector: 'app-arquitecture-ims',
  templateUrl: './arquitecture-ims.component.html',
  styleUrls: ['./arquitecture-ims.component.css']
})
export class ArquitectureImsComponent implements OnInit {
  arquitecture: any;
  vmsCore: any;
  vmsAditionals: any;
  idArquitecture:string;
  status:boolean=true;


  constructor( private router: Router, 
              private _arquitecture:ArquitectureService, 
              private _user:UsersService,
              private activatedRouter:ActivatedRoute,
              private toastr:ToastrService ) 
    {
      this.activatedRouter.params.subscribe( params =>{
       this.idArquitecture = params.id;
      })
     }

  async ngOnInit() {

    await this.getArquitecture(this.idArquitecture);
    console.log(this.arquitecture.vmCoreIMS);
    this.vmsCore=this.arquitecture.vmCoreIMS;
    this.vmsAditionals=this.arquitecture.vmAditionals;
  }

  async getArquitecture(id){
   await this._arquitecture.getArquitecture(id)
         .toPromise( )
         .then(data =>{
          this.arquitecture = data;
          // console.log(this.arquitecture)
         })
  }

  powerServer(id){
    console.log(id)
  }
  instantServer(id){
    console.log(id)
  }
  deleteServer(id){
    console.log(id)
  }
  returnServer(id){
    console.log(id)
  }
  resizeServer(id){
    console.log(id)
    document.getElementById('divRedimencion'+id).style.display="none";
    document.getElementById('btnRedimencion'+id).style.display = "";
  }
  consoleServer(id){
    console.log(id)
  }
  seeFormEditVm(id){
    document.getElementById('btnRedimencion'+id).style.display="none";
    document.getElementById('divRedimencion'+id).style.display = "";
    
  }
  hideFormEditVm(id){
    document.getElementById('btnRedimencion'+id).style.display="";
    document.getElementById('divRedimencion'+id).style.display = "none";
  }
}
