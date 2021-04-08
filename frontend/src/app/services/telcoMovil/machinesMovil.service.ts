import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Arquitecture } from 'src/app/models/models.index';
import { UsersService } from "src/app/services/telco/users.service";


@Injectable({
  providedIn: 'root'
})
export class MachinesMovilService {
 
  arquitectures: Arquitecture;
  freeArquitectures: Arquitecture;
  arquitecturesOfUser: any;

  constructor( private http: HttpClient,
              // private _user:UsersService 
              ) {
    
   }
   readonly URL_API_ARQUTIECTURE:string = `http://10.55.6.171:3000/telco_movil/mserver`;
   readonly URL_API_OAI:string = `http://10.55.6.171:3000/telco_movil/mtest`;
   readonly URL_API_MV:string = `http://10.55.6.171:3000/ims/server`;



   //readonly URL_API_ARQUTIECTURE:string = `http://localhost:3000/telco_movil/mserver`;

  actionMachine(idMachine, action, idArquitecture='', dataForm={}){
    let data={
      'action': action,
      'idArquitecture': idArquitecture,
      'dataForm': dataForm
    }
    return this.http.post(this.URL_API_ARQUTIECTURE + `/${idMachine}`, data)
  }
  
  getMachines(){
      return this.http.get(this.URL_API_ARQUTIECTURE+'s');
  }
 
  createMachine(machine:any){
    return this.http.post(this.URL_API_ARQUTIECTURE, machine)
  }

  addMachineOp(dataform){    
      return this.http.post( 'http://10.55.6.171:3000/telco_movil/mserver/arquitecture/'+dataform.idArq, dataform )
    
  }

  getServer(idMachine){
    return this.http.get(this.URL_API_MV+'/'+idMachine)
  }
  
   updateMachinE(machine:any){
     return this.http.put(this.URL_API_ARQUTIECTURE + `/${machine._id}`,machine);
   }
   
  deleteMachine(_id: string){
    return this.http.delete(this.URL_API_ARQUTIECTURE + `/${_id}`);
  }

  getMachine(id){
    return this.http.get(this.URL_API_ARQUTIECTURE + `/${id}`);
  }

   
  filterArqByUser(arquitectures, idUser){
    return arquitectures.filter(function(arq){
      return arq.status == idUser;
    })
  }

 pruebasoai(machine:any){
  return this.http.post(this.URL_API_OAI, machine)

 } 

}