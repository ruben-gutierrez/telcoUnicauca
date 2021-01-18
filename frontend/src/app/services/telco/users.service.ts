import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { User } from 'src/app/models/models.index';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userLoged=false
  selectedUser: User;
  userActive:User;
  tokenActive:string;
  users: User[];
  pageRegister=false;
  constructor( private http:HttpClient,
    ) {
      
    }

    readonly URL_API_USERS:string = `http://localhost:3000/api/users`;
  
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
    logued(){
      if (this.userActive == undefined) {
        return false
      }
      return true
    }
  
    loginUser(infoLogin){
      const headers:HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        // 'x-access-token': this.token
      });
      return this.http.post('http://localhost:3000/auth/signin',infoLogin,{headers});
          
    }
  
    logOutUser(){
      this.userLoged=false;
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
      this.userActive=JSON.parse(localStorage.getItem("currentUser"))
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
