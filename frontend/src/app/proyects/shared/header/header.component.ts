import { Component, OnInit } from '@angular/core';
import { UsersService } from "src/app/services/services.index";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any;
  constructor( private _user: UsersService) { }

  ngOnInit() {
    this.user=this._user.getCurrentUser()
  }

  logout(){
    console.log("salir de la pagina")
  }

}
