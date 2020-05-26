import { Component, OnInit } from '@angular/core';
import { TestService, ArquitecturesService, UsersService } from 'src/app/services/services.index';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.css']
})
export class NewTestComponent implements OnInit {
  arquitectures:any
  constructor(
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

}