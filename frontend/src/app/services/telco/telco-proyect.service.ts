
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TelcoProyect } from 'src/app/models/telcoProyect.model';

@Injectable({
  providedIn: 'root'
})
export class TelcoProyectService {

  proyects: TelcoProyect;
  readonly URL_API_PROYECT:string ='http://10.55.6.31:3000/proyecttelco';

  constructor( private http: HttpClient
              ) {
    
   }
  
   getProyectsTelco(){
    return this.http.get('http://10.55.6.31:3000/proyectstelco');
  }

  createProyectTelco(proyectTelco:TelcoProyect){
    return this.http.post(this.URL_API_PROYECT, proyectTelco)
  }

  updateProyectTelco(proyectTelco:TelcoProyect){
    return this.http.put(this.URL_API_PROYECT + `/${proyectTelco._id}`,proyectTelco);
  }


  deleteProyectTelco(_id: string){
    return this.http.delete(this.URL_API_PROYECT + `/${_id}`);
  }

  getProyectTelco(id){
    return this.http.get(this.URL_API_PROYECT + `/${id}`);
  }


  
}
