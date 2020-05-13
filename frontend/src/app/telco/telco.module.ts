
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




@NgModule({
    declarations:[
        TelcoComponent,
        HomeComponent,
        AboutComponent,
        ComunityComponent,
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
        RouterModule
    ]
})
export class TelcoModule { }