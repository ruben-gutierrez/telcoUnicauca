import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'


@Injectable()
export class OpenstackQueriesService {

  URL_API_OPENSTACK='http://10.55.6.31:3000/openstack/'
  constructor(private http: HttpClient) { }
  getNetworks(){
    return this.http.get(this.URL_API_OPENSTACK+'networks');
  }
  getImages(){
    return this.http.get(this.URL_API_OPENSTACK+'images');
  }

  showFlavor(id:string){
    return this.http.get(this.URL_API_OPENSTACK+'flavor/'+id);
  }
}
