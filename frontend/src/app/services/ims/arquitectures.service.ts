import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Arquitecture } from 'src/app/models/models.index';
import { UsersService } from "src/app/services/telco/users.service";


@Injectable({
  providedIn: 'root'
})
export class ArquitecturesService {
 
  arquitectures: Arquitecture;
  freeArquitectures: Arquitecture;
  arquitecturesOfUser: any;

  constructor( private http: HttpClient,
              private _user:UsersService ) {
    
   }
  readonly URL_API_ARQUTIECTURE:string = `http://10.55.6.31:3000/ims/arquitecture`;
  
  getArquitectures(){
      return this.http.get(this.URL_API_ARQUTIECTURE+'s');
  }
  async getArquitecturesOfUser(idUser){
      let arqs;
      await this.http.get(this.URL_API_ARQUTIECTURE+'s')
          .toPromise()
          .then(data =>{
            this.arquitecturesOfUser=arqs=this.filterArqByUser(data,idUser);
          })
         //console.log(arqs)  
      return arqs

  }

  createArquitecture(arquitecture:Arquitecture){
    
    return this.http.post(this.URL_API_ARQUTIECTURE, arquitecture)
  }

  updateArquitecture(arquitecture:Arquitecture){
    return this.http.put(this.URL_API_ARQUTIECTURE + `/${arquitecture._id}`,arquitecture);
  }

  dropArquitecture(id){
    return this.http.put(`http://10.55.6.31:3000/ims/arquitectureDrop/${id}`,null);
  }


  deleteArquitecture(_id: string){
    return this.http.delete(this.URL_API_ARQUTIECTURE + `/${_id}`);
  }
  
  getArquitecture(id){
    return this.http.get(this.URL_API_ARQUTIECTURE + `/${id}`);
  }


  filterArqByUser(arquitectures,idUser) {

    return arquitectures.filter(function(arq){
     
      return arq.status == idUser ;
    }
    )
  }
}
