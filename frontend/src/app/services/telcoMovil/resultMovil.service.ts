import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Arquitecture } from 'src/app/models/models.index';
import { UsersService } from "src/app/services/telco/users.service";


@Injectable({
  providedIn: 'root'
})
export class ResultMovilService {
 
  arquitectures: Arquitecture;
  freeArquitectures: Arquitecture;
  arquitecturesOfUser: any;
  
  constructor( private http: HttpClient,
              // private _user:UsersService 
              ) {
    
   }

   readonly URL_API_RESULT:string = `http://10.55.6.171:3000/telco_movil/mresult`;
   
  


   createResult(data:any){
    return this.http.post(this.URL_API_RESULT, data)
  }



}