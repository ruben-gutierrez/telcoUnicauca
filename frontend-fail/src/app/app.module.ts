import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from "ng2-charts";
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatSliderModule } from '@angular/material/slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';


//services
import { OpenstackQueriesService } from './services/openstack-queries.service';
import { ServersService } from './services/servers.service';
import { GraphService } from './services/graphs.service';
import { NotificationService } from './services/notifications.service';

//guards



//Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NoFoundPageComponent } from './shared/no-found-page/no-found-page.component';
import { TelcoModule } from './telco/telco.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NoFoundPageComponent,
    
 
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule, 
    MatSlideToggleModule,
    MatSliderModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:1500,
      positionClass:'toast-top-right',
      preventDuplicates: false
    }),
    TelcoModule,
    CommonModule

 
  ],
  providers: [
    OpenstackQueriesService,
    ServersService,
    GraphService,
    NotificationService,


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
