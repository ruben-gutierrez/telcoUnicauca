import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Test } from '../models/test';
import { UsersService } from "./users.service";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  tests: Test;
  testsOfArquitecture: Test;

  constructor( private http: HttpClient,
              private _user:UsersService ) {
    this.tests = new Test();
   }
  readonly URL_API_TEST:string = `http://10.55.6.31:3000/ims/test`;
  
  getTests(){
      return this.http.get(this.URL_API_TEST+'s');
  }

  async getTestsOfUser(idTest){
      let tests;
      await this.http.get(this.URL_API_TEST+'s')
          .toPromise()
          .then(data =>{
            this.testsOfArquitecture=tests=this.filterTestByArquitecture(data,idTest);
          })
          // console.log(arqs)  
      return tests
  }

  createTest(test){
    return this.http.post(this.URL_API_TEST, test)
  }

  updateTest(test:Test){
    return this.http.put(this.URL_API_TEST + `/${test._id}`,test);
  }


  deleteTest(_id: string){
    return this.http.delete(this.URL_API_TEST + `/${_id}`);
  }
  getTestData(_id: string){
    return this.http.get(this.URL_API_TEST + `Data/${_id}`);
  }
  executeTest(_id: string,){
    return this.http.get( "http://10.55.6.31:3000/ims/testExecute"+`/${_id}`);
  }
  stopTest(_id: string,){
    return this.http.get( "http://10.55.6.31:3000/ims/testStop"+`/${_id}`);
  }
  
  getTest(id){
    return this.http.get(this.URL_API_TEST + `/${id}`);
  }


  filterTestByArquitecture(tests,idTest) {

    return tests.filter(function(test){
     
      return test.status == idTest ;
    }
    )
  }

}

 