import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class ServersService {
  readonly URL_API_SERVER:string = `http://10.55.6.31:3000/ims/server`;
  constructor(  private http: HttpClient ) { }

  actionsServer(idServer, action,idArquitecture='', dataForm={}){
    let data={
      'action':action,
      'idArquitecture':idArquitecture,
      'dataForm': dataForm
    }
    return this.http.post(this.URL_API_SERVER  + `/${idServer}`, data)
  }
  addServerArquitecture(dataform){
    return this.http.post( 'http://10.55.6.31:3000/ims/server/arquitecture/'+dataform.idArq, dataform )
  }
  getServer(idServer){
    return this.http.get( 'http://10.55.6.31:3000/ims/server/'+idServer )
  }
}
