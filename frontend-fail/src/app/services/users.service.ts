import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  selectedUser: User;
  userActive:User;
  tokenActive:string;
  users: User[];

  constructor( private http: HttpClient ) {
    this.selectedUser = new User();
   }
  readonly URL_API_USERS:string = `http://10.55.6.31:3000/api/users`;
  
  getUsers(){
      return this.http.get(this.URL_API_USERS);
  }

  createUser(user:any){
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

  loginUser(infoLogin){
    console.log(infoLogin)
    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'x-access-token': this.token
    });
    return this.http.post('http://10.55.6.31:3000/auth/signin',infoLogin,{headers});
        
  }

  logOutUser(){
    this.tokenActive=null;
    this.userActive=null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    return "logout: true";
  }

  setUser( user:User ){
    let userOK = JSON.stringify(user);
    localStorage.setItem("currentUser", userOK);
  }

  setToken( token:string ){
    localStorage.setItem("accessToken",token);
  }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem("currentUser"));
  }
  
  getToken(){
    return localStorage.getItem("accessToken");
  }
  
  verifyToken(token){
    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.get('http://10.55.6.31:3000/auth/verify',{headers});
  }
}

