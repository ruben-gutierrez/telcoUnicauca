import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  selectedUser: User;
  users: User[];

  constructor( private http: HttpClient ) {
    this.selectedUser = new User();
   }
  readonly URL_API_USERS:string = `http://localhost:3000/api/users`;
  
  getUsers(){
      return this.http.get(this.URL_API_USERS);
  }
  createUser(user:User){
    return this.http.post(this.URL_API_USERS, user)
  }
  updateUser(user:User){
    return this.http.put(this.URL_API_USERS + `/${user._id}`,user);
  }
  deleteUser(_id: string){
    return this.http.delete(this.URL_API_USERS + `/${_id}`);
  }
  
  getUser(id){
    return this.http.get(this.URL_API_USERS + `/${id}`);
  }

  
  //  readonly token:string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkY2M3OGVmZmIxMzcyMTdjN2YwN2IzZiIsImlhdCI6MTU3MzczNDEwOCwiZXhwIjoxNTczNzM3NzA4fQ.dQHPwxjdO-2oYzXHNwql5ugIjPGuQTVjHy-qXr2eG6s';

  //  getQuery( query: string ){
  //   const headers:HttpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'x-access-token': this.token
  //   });
  //   // return this.http.get(this.URL+query,{ headers });
  //  }

  // // getUsers(){
  // //   return this.getQuery('')
  // // }

  // getUser(id){
  //   return this.getQuery('/'+id)
  // }



  // postQuery( body){
  //   const headers:HttpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     // 'x-access-token': this.token
  //   });
  //   return this.http.post('http://localhost:3000/auth/signin',body,{headers});
  // }
  // newUser(user:any ){
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json'
  //     })
  //   };
  //   return this.http.post('http://localhost:3000/api/users',user,httpOptions);
        
  // }




  // loginUser(body){
  //   const headers:HttpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     // 'x-access-token': this.token
  //   });
  //   this.http.post('http://localhost:3000/auth/signin',body,{headers})
  //       .subscribe( data => {
  //         console.log(data)
  //       });
  // }
}
