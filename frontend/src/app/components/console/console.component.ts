import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styles: []
})
export class ConsoleComponent {
  constructor( private _users: UsersService ) { 
    this._users.getUsers();
  }
  
  
}
