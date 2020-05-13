
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

// modules


// Routes
import { TelcoRoutes } from './telco.routes';


// Components
import { ComunityComponent } from './comunity/comunity.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TelcoComponent } from './telco.component';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';




@NgModule({
    declarations:[
        TelcoComponent,
        HomeComponent,
        AboutComponent,
        ComunityComponent,
        ContactComponent
    ],
    exports:[
        TelcoComponent,
        HomeComponent,
        AboutComponent,
        ComunityComponent,
        ContactComponent
    ],
    imports:[
        SharedModule,
        TelcoRoutes,
        RouterModule,
        CommonModule
    ]
})
export class TelcoModule { }