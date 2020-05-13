import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { User } from "src/app/models/user.model";


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userActive:User;
  tokenActive:string;
  ipBackend='localhost:3000';
  readonly URL_API_USERS:string = `http://`+this.ipBackend+`/api/users`;
  selectedUser: User;

  constructor( private http:HttpClient,
    ) {}

  getUsers(){
    return this.http.get('http://'+this.ipBackend+'/api/users');
  }

  createUser(user:any){
    return this.http.post(this.URL_API_USERS, user)
  }

  loginUser(infoLogin){
    // console.log(infoLogin)
    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'x-access-token': this.token
    });
    return this.http.post('http://'+this.ipBackend+'/auth/signin',infoLogin,{headers}); 
  }

  setUser( user:User ){
    let userOK = JSON.stringify(user);
    localStorage.setItem("currentUser", userOK);
  }

  setToken( token:string ){
    localStorage.setItem("accessToken",token);
  }




}
