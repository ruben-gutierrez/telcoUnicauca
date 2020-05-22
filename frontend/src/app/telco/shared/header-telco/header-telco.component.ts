import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from "src/app/services/services.index";


@Component({
  selector: 'app-header-telco',
  templateUrl: './header-telco.component.html',
  styleUrls: ['./header-telco.component.css']
})
export class HeaderTelcoComponent implements OnInit {
 user:any;
 userlength:number;
  constructor(private router: Router,
                  private _user:UsersService) { 
                    this.user=this._user.userActive;
                  }

  ngOnInit() {
    this.user=this._user.getCurrentUser()
  //  this.userlength=Object.keys(this.user).length
  console.log(this.user)
  }
  logout(){
    
    this._user.logOutUser()
  }

}
