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
import { AvailableComponent } from './components/proyects/ims/available/available.component';
import { ReservedComponent } from './components/proyects/ims/reserved/reserved.component';
import { TestsComponent } from './components/proyects/ims/tests/tests.component';
import { TestComponent } from './components/proyects/ims/test/test.component';
import { NewTestComponent } from './components/proyects/ims/new-test/new-test.component';
import { GraphicsComponent } from './components/proyects/ims/graphics/graphics.component';
import { GraphComponent } from './components/proyects/ims/graph/graph.component';
import { NewGraphComponent } from './components/proyects/ims/new-graph/new-graph.component';
import { ArquitectureImsComponent } from './components/proyects/ims/arquitecture-ims/arquitecture-ims.component';
import { AdminNewProyectComponent } from './components/console/admin-proyects/admin-new-proyect/admin-new-proyect.component';
import { AdminProyectComponent } from './components/console/admin-proyects/admin-proyect/admin-proyect.component';
import { AdminNewArquitectureComponent } from './components/console/admin-proyects/admin-new-arquitecture/admin-new-arquitecture.component';
import { EditArquitectureComponent } from './components/console/admin-proyects/admin-proyect/edit-arquitecture/edit-arquitecture.component'



//services
import { OpenstackQueriesService } from './services/openstack-queries.service';
import { ServersService } from './services/servers.service';
import { GraphService } from './services/graphs.service';
import { NotificationService } from './services/notifications.service';

//guards



import { GraphTemplateComponent } from './components/proyects/ims/graph/graph-template/graph-template.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavImsComponent } from './components/proyects/ims/nav-ims/nav-ims.component';
import { NavContentComponent } from './components/proyects/ims/nav-content/nav-content.component';

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
    SignupComponent,
    AvailableComponent,
    ReservedComponent,
    TestsComponent,
    TestComponent,
    NewTestComponent,
    GraphicsComponent,
    GraphComponent,
    NewGraphComponent,
    ArquitectureImsComponent,
    AdminNewProyectComponent,
    AdminProyectComponent,
    AdminNewArquitectureComponent,
    EditArquitectureComponent,
    GraphTemplateComponent,
    LoadingComponent,
    NavImsComponent,
    NavContentComponent
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
    })
  ],
  providers: [
    OpenstackQueriesService,
    ServersService,
    GraphService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
