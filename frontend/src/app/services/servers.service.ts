import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class ServersService {
  readonly URL_API_SERVER:string = `http://localhost:3000/ims/server`;
  constructor(  private http: HttpClient ) { }

  actionsServer(idServer, action, dataForm={}){
    let data={
      'action':action,
      'dataForm': dataForm
    }
    return this.http.post(this.URL_API_SERVER  + `/${idServer}`, data)
  }
}
