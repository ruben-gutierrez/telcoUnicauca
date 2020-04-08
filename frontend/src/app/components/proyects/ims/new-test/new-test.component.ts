import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/tests.service';
import { ArquitectureService } from 'src/app/services/arquitectures.service';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.css']
})
export class NewTestComponent implements OnInit {
  loading=false;
  arquitectures:any
  constructor(private _test:TestService,
              private _arquitecture:ArquitectureService,
              private toastr:ToastrService,
              private router:Router,
              private _user:UsersService) {
        this._arquitecture.getArquitecturesOfUser(this._user.userActive._id)
        .then( data =>{
          this.arquitectures=data
        })
      }

  ngOnInit() {
   
  }
  createTest(formTest){
    // this.loading=true;

  //  console.log(formTest.value)
    this._test.createTest(formTest.value)
      .subscribe( data =>{
        if (data['status'] == 200) {
          this.loading=false;
          this.toastr.success('Prueba Creada')
          this.router.navigate(["/ims/tests"])
        }else{
          this.toastr.error('Error al crear prueba')
        }
        // console.log(data)
        
      })
      
  }

}
