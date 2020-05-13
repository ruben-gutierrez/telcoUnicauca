
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NoFoundPageComponent } from './shared/no-found-page/no-found-page.component';





const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  { path: '**', component: NoFoundPageComponent },
];


export const AppRoutingModule = RouterModule.forRoot ( routes );