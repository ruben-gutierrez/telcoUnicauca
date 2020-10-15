import { Component, OnInit } from '@angular/core';
import { TestService, ArquitecturesService, UsersService, ServerService, GraphsService } from 'src/app/services/services.index';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.css']
})
export class NewTestComponent implements OnInit {
  
  servers=[];
  typeGraphsServer=[];
  //multi selecct
    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    itemList: any = [];
    settings = {};
  //formTest
  formNewTest:FormGroup;
  
  // test
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
              private _graph:GraphsService,
              private _server:ServerService,
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
    this.formNewTest= new FormGroup({
      name: new FormControl(null, Validators.required),
      idArquitecture: new FormControl(null, Validators.required),
      graphsRelated: new FormControl(null),
      description: new FormControl(null),
      contentFile: new FormControl(null),
    })
    

 
this.dropdownSettings = { 
  singleSelection: false,
      text: "Gráficas",
      selectAllText: 'Seleccionar todo',
      unSelectAllText: 'Quitar todo',
      searchPlaceholderText: 'Buscar gráficas',
      enableSearchFilter: true,
      badgeShowLimit: 5,
      groupBy: "category"
         
        }; 
 
    this.asignTextCode()
  }

  createTest(){
    if (this.formNewTest.status == 'VALID') {
      this._test.createTest(this.formNewTest.value)
        .subscribe( data =>{
          
          if (data['status'] == 200) {
            this.toastr.success('Prueba Creada')
            this.router.navigate(["/ims/tests"])
          }else{
            this.toastr.error('Error al crear prueba')
          }
        })
    }else{
      console.log("error")
    }
    
    // console.log(this.formNewTest)
    // 
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

  updateServers(){
    if( this.formNewTest.value.idArquitecture != ''){
      // console.log(this.formNewTest.value.idArquitecture)
      this._arquitecture.getArquitecture(this.formNewTest.value.idArquitecture)
        .subscribe( data=>{
          // console.log(data)
          let listSelect=[]
          let listSelect1=[]
          let listSelect2=[]
          data['content'].vmCoreIMS.forEach(vm => {
            vm.graphs.forEach(graph => {

              listSelect1.push(  {"id":graph._id,"itemName": graph.name,"category": vm.name} )
              this.dropdownList=listSelect1;
            });
            this.servers.push(vm)
          });
          data['content'].vmAditionals.forEach(vm => {
            let listSelect2=[]
            vm.graphs.forEach(graph => {
              listSelect2.push(  {"id":graph._id,"itemName": graph.name,"category":vm.name} )
              this.dropdownList=listSelect2;
            });
            this.servers.push(vm)
          });
          // console.log(this.servers)
        })
    }
    }
   
    upgradeGraphs(){
      // console.log(this.formNewTest.value.idServer)
      this._graph.getGraphTypes(this.formNewTest.value.idServer)
      .subscribe( data =>{
        // console.log(data)
        if (data['status'] == 200 ) {
          this.typeGraphsServer=data['content']
          
        }
      })
    }

  // Funcitons select
  
    onSearch(evt: any) {
      console.log(evt.target.value);
      this.itemList = [];
      this.http.get('https://restcountries.eu/rest/v2/name/'+evt.target.value+'?fulltext=true')
          .subscribe(res => {
              // console.log(res);
              this.itemList = res;
          }, error => {

          });
  }
  onItemSelect(item: any) {
      // console.log(item);
      // console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
      // console.log(item);
      // console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
      // console.log(items);
  }
  onDeSelectAll(items: any) {
      // console.log(items);
  }

}