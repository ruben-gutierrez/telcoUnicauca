import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Arquitecture } from 'src/app/models/models.index';
import { UsersService } from "src/app/services/telco/users.service";


@Injectable({
  providedIn: 'root'
})
export class TestsMovilService {
 
  arquitectures: Arquitecture;
  freeArquitectures: Arquitecture;
  arquitecturesOfUser: any;
  
  constructor( private http: HttpClient,
              // private _user:UsersService 
              ) {
    
   }

   readonly URL_API_TEST:string = `http://10.55.6.171:3000/telco_movil/mtest`;
   readonly URL_API:string = `http://10.55.6.171:3000/telco_movil/`;

  

  executeTest(dataForm){
    let data={
      'dataForm': dataForm
    }
    return this.http.post(this.URL_API_TEST, data)
  }

  createTest(data:any){
    return this.http.post(this.URL_API_TEST, data)
  }


  getdata(id){
    return this.http.get(this.URL_API+`datatest/`+id)
  }
  getTests(){
    return this.http.get(this.URL_API_TEST+'s');
  }
  getTest(idTest){
    return this.http.get(this.URL_API_TEST+'/'+idTest);
}


deleteTest(_id: string){
  return this.http.delete(this.URL_API_TEST + `/${_id}`);
}

  
}