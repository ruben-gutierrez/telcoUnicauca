import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

//modules
import { TelcoModule } from './telco/telco.module';
import { ProyectsModule } from './proyects/proyects.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngb-modal';
import { ChartsModule } from 'ng2-charts';

// Componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// import { HeaderUserComponent } from './telco/shared/header-user/header-user.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TelcoModule,
    ProyectsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    ModalModule,
    NgbModule,
    
    
  ],
  exports:[
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
