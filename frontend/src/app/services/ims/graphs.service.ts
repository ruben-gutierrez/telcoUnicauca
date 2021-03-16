import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Graph } from 'src/app/models/graph.model';

@Injectable({
  providedIn: 'root'
})
export class GraphsService {
  readonly URL_API_GRAPH:string = `http://10.55.6.171:3000/ims/graph`;
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
  createGraph(formGraph){
    return this.http.post(this.URL_API_GRAPH ,formGraph['value']);
  }
  deleteGraph(idGraph:string){
    return this.http.delete(this.URL_API_GRAPH + `/${idGraph}`);
  }
}
