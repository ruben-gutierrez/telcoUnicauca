import { Component, OnInit } from '@angular/core';
import { UsersService } from "src/app/services/services.index";

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  constructor( private _user: UsersService ) { 
    this._user.getUsers();
   }

  ngOnInit(): void {
  }

}
