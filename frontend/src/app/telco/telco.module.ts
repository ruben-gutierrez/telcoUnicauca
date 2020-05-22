
import { NgModule } from "@angular/core";

// modules
import { SharedTelcoModule } from './shared/sharedTelco.module';

// Routes
import {  TelcoRoutes } from './telco.routes';

// Components
import { ComunityComponent } from './comunity/comunity.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TelcoComponent } from './telco.component';
import { RouterModule } from '@angular/router';
import { ConsoleComponent } from './console/console.component';
import { AdminProyectsComponent } from './console/admin-proyects/admin-proyects.component';
import { AdminUsersComponent } from './console/admin-users/admin-users.component';
import { AdminUserComponent } from './console/admin-users/admin-user/admin-user.component';
import { AdminNewUserComponent } from './console/admin-users/admin-new-user/admin-new-user.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminProyectComponent } from './console/admin-proyects/admin-proyect/admin-proyect.component';
import { AdminNewProyectComponent } from './console/admin-proyects/admin-new-proyect/admin-new-proyect.component';
import { AdminNewArquitectureComponent } from './console/admin-proyects/admin-new-arquitecture/admin-new-arquitecture.component';
import { AdminEditArquitectureComponent } from './console/admin-proyects/admin-edit-arquitecture/admin-edit-arquitecture.component';
import { AppModule } from '../app.module';
import { SharedModule } from '../proyects/shared/shared.module';





@NgModule({
    declarations:[
        TelcoComponent,
        HomeComponent,
        AboutComponent,
        ComunityComponent,
        ConsoleComponent,
        AdminProyectsComponent,
        AdminUsersComponent,
        AdminUserComponent,
        AdminNewUserComponent,
        AdminProyectComponent,
        AdminNewProyectComponent,
        AdminNewArquitectureComponent,
        AdminEditArquitectureComponent,
        
    ],
    exports:[
        TelcoComponent,
        HomeComponent,
        AboutComponent,
        ComunityComponent,
    ],
    imports:[
        SharedTelcoModule,
        TelcoRoutes,
        RouterModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SharedModule
        


    ]
})
export class TelcoModule { }