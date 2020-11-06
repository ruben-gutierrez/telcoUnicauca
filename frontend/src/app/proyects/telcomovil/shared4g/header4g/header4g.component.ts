import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/telco/users.service';

@Component({
  selector: 'app-header4g',
  templateUrl: './header4g.component.html',
  styleUrls: ['./header4g.component.css']
})
export class Header4gComponent implements OnInit {
user:any;
  constructor(private _user: UsersService) { }


  ngOnInit(): void {
    this.user=this._user.getCurrentUser()
  }
  logout(){
    console.log("salir de la pagina")
  }

}


