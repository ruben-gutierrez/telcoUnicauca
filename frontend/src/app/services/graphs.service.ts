import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Graph } from '../models/graph';


@Injectable()
export class GraphService {
  readonly URL_API_GRAPH:string = `http://10.55.6.31:3000/ims/graph`;
  constructor( private http:HttpClient) { }
  getDataGraph(id){
    return this.http.get(this.URL_API_GRAPH + `Data/${id}`);
  }
  getGraph(id){
    return this.http.get(this.URL_API_GRAPH + `/${id}`);
  }
  getGraphTypes(idServer){
    return this.http.get(this.URL_API_GRAPH + `types/${idServer}`);
  }
  createGraph(formGraph:Graph){
    return this.http.post(this.URL_API_GRAPH ,formGraph['value']);
  }
  deleteGraph(idGraph:string){
    return this.http.delete(this.URL_API_GRAPH + `/${idGraph}`);
  }
}
