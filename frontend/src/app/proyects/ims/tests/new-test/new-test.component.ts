import { Component, OnInit } from '@angular/core';
import { TestService, ArquitecturesService, UsersService } from 'src/app/services/services.index';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.css']
})
export class NewTestComponent implements OnInit {
  showGuides=false;
  index=0;
  arquitectures:any
  guides=[
    // ["nombre","archivo","Imagenflujos", "descripción"],
    { name:'Registro y código 401', code:'flow_register1.xml',image:'flow_register1.png', codeText:'', description:'mensaje que se envia Clearwater con informacion registrar un usuario '},
    {name:'registro de confirmación y código 200', code:'flow_register2.xml',image: 'flow_register2.png', codeText:'', description:'Respuesta del servidor que indica que una petición se proceso con exito'},
    {name:'Invite y código 100',code:'flow_register3.xml',image:'flow_register3.png', codeText:'', description:'Solicitud de llamada'},
    {name:'ringing',code:'flow_register4.xml',image:'flow_register4.png', codeText:'', description:'Solicitud de llamada'},
  ]
  guide={
    messages:[
      // ["nombre","archivo","Imagenflujos", "descripción"],
      ["Registro y código 401","flow_register1.xml","flow_register1.png", "mensaje que se envia Clearwater con informacion registrar un usuario "],
      ["registro de confirmación y código 200","flow_register2.xml","flow_register2.png", "Respuesta del servidor que indica que una petición se proceso con exito"],
      ["Invite y código 100","flow_register3.xml","flow_register3.png", "Solicitud de llamada"],
      ["ringing","flow_register4.xml","flow_register4.png", "Solicitud de llamada"],
    ]    
  } 
  constructor(
              private http: HttpClient,
              private _test:TestService,
              private _arquitecture:ArquitecturesService,
              private toastr:ToastrService,
              private router:Router,
              private _user:UsersService,
              private _location: Location
  ) { 
    
    this._user.getCurrentUser();
    this._arquitecture.getArquitecturesOfUser(this._user.userActive._id)
    .then( data =>{
      this.arquitectures=data
    })
    
   }

  ngOnInit() {
    this.asignTextCode()
  }

  createTest(formTest){
    this._test.createTest(formTest.value)
      .subscribe( data =>{
        if (data['status'] == 200) {
          this.toastr.success('Prueba Creada')
          this.router.navigate(["/ims/tests"])
        }else{
          this.toastr.error('Error al crear prueba')
        }
      })
  }
  showGuide(){
    
      this.showGuides=true
    
  }
  hideGuide(){ 
    this.showGuides=false
  }

  addIndex(){
    if(this.index <= this.guide.messages.length -1){
      this.index += 1;
      console.log(this.index)
    }
    
  }
  lessIndex(){
    if(this.index >=1){
      this.index -= 1;
      console.log(this.index)
    }
  }
  asignTextCode(){
    this.guides.forEach(element => {
      this.http.get("assets/ims/guideTest/"+element.code, { responseType: 'text'}) 
    .toPromise()
    .then( data =>{
     element.codeText=data
    })
    });
  }
  
}