import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-admin-new-user',
  templateUrl: './admin-new-user.component.html',
  styleUrls: ['./admin-new-user.component.css']
})
export class AdminNewUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  newUser( dataForm:NgForm ){
    console.log(dataForm.value)
  }

}
