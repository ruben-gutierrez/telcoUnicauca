import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProyectsComponent } from './components/proyects/proyects.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ConsoleComponent } from './components/console/console.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CountComponent } from './components/count/count.component';
import { InformationComponent } from './components/count/information/information.component';
import { SecurityComponent } from './components/count/security/security.component';
import { AdminProyectsComponent } from './components/console/admin-proyects/admin-proyects.component';
import { AdminUsersComponent } from './components/console/admin-users/admin-users.component';
import { MisionComponent } from './components/about/mision/mision.component';
import { VisionComponent } from './components/about/vision/vision.component';
import { ArquitectureComponent } from './components/about/arquitecture/arquitecture.component';
import { ComunityComponent } from './components/comunity/comunity.component';
import { MasteryComponent } from './components/comunity/mastery/mastery.component';
import { UndergraduateComponent } from './components/comunity/undergraduate/undergraduate.component';
import { DoctorateComponent } from './components/comunity/doctorate/doctorate.component';
import { PosdoctoralComponent } from './components/comunity/posdoctoral/posdoctoral.component';
import { ResearchComponent } from './components/comunity/research/research.component';
import { IMSComponent } from './components/proyects/ims/ims.component';
import { PoliticsComponent } from './components/about/politics/politics.component';



import { HttpClientModule } from '@angular/common/http';
import { AdminUserComponent } from './components/console/admin-users/admin-user/admin-user.component';
import { AdminNewUserComponent } from './components/console/admin-users/admin-new-user/admin-new-user.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

//services


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProyectsComponent,
    AboutComponent,
    ContactComponent,
    ConsoleComponent,
    NavbarComponent,
    FooterComponent,
    CountComponent,
    InformationComponent,
    SecurityComponent,
    AdminProyectsComponent,
    AdminUsersComponent,
    MisionComponent,
    VisionComponent,
    ArquitectureComponent,
    ComunityComponent,
    MasteryComponent,
    UndergraduateComponent,
    DoctorateComponent,
    PosdoctoralComponent,
    ResearchComponent,
    IMSComponent,
    PoliticsComponent,
    AdminUserComponent,
    AdminNewUserComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:1500,
      positionClass:'toast-top-right',
      preventDuplicates: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
