import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/tests.service';
import { ArquitectureService } from 'src/app/services/arquitectures.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.css']
})
export class NewTestComponent implements OnInit {
  arquitectures:any
  constructor(private _test:TestService,
              private _arquitecture:ArquitectureService,
              private _user:UsersService) {
        this._arquitecture.getArquitecturesOfUser(this._user.userActive._id)
        .then( data =>{
          this.arquitectures=data
        })
      }

  ngOnInit() {
   
  }
  createTest(formTest){
  //  console.log(formTest.value)
    this._test.createTest(formTest.value)
      .subscribe( data =>{
        console.log(data)
      })
      
  }

}
