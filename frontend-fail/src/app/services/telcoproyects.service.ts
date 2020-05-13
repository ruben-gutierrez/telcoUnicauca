import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ProyectTelco } from '../models/proyecTelco';


@Injectable({
  providedIn: 'root'
})
export class TelcoproyectService {

  proyects: ProyectTelco;
  readonly URL_API_PROYECT:string ='http://10.55.6.31:3000/proyecttelco';

  constructor( private http: HttpClient
              ) {
    this.proyects = new ProyectTelco();
   }
  
  
  getProyectsTelco(){
      return this.http.get('http://10.55.6.31:3000/proyectstelco');
  }
  
  createProyectTelco(proyectTelco:ProyectTelco){
    return this.http.post(this.URL_API_PROYECT, proyectTelco)
  }

  updateProyectTelco(proyectTelco:ProyectTelco){
    return this.http.put(this.URL_API_PROYECT + `/${proyectTelco._id}`,proyectTelco);
  }


  deleteProyectTelco(_id: string){
    return this.http.delete(this.URL_API_PROYECT + `/${_id}`);
  }
  
  getProyectTelco(id){
    return this.http.get(this.URL_API_PROYECT + `/${id}`);
  }


 

}

