import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'




@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor( private http: HttpClient ) {
    
   }
   readonly URL:string = `http://localhost:3000/api/`;
   readonly token:string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzVhMTJkNzhkZTFiMDcwNGI3ODczZSIsImlhdCI6MTU3MzYyMzkzOSwiZXhwIjoxNTczNjI3NTM5fQ.wKv2qD72s78SXtouhEjfsrE9mKr7ODJefU-m76JYeig';

   getQuery( query: string ){
    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.token
    });
    return this.http.get(this.URL+query,{ headers });
   }

  getUsers(){
    return this.getQuery('users')
  }
  getUser(id){
    const petition = 'users/'+ id;
    return this.getQuery(petition)
  }
  


  postQuery(query, body){
    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.token
    });
    return this.http.post(this.URL,body,{headers});
  }
  newUser(query, user){
    this.postQuery(query, user);
  }


  deleteUser(){
    
  }
  UpdateUser(){

  }
}
