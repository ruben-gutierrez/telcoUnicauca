
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';


// modules
import { RouterModule } from '@angular/router';




// Components
import { HeaderTelcoComponent } from './header-telco/header-telco.component';
import { BreadcrumbsTelcoComponent } from './breadcrumbs-telco/breadcrumbs-telco.component';
import { NopagefoundComponent } from 'src/app/shared/nopagefound/nopagefound.component';
import { SharedModule } from 'src/app/proyects/shared/shared.module';
// import { MessagesComponent } from './messages/messages.component';
// import { HeaderUserComponent } from './header-user/header-user.component';



@NgModule({
    imports:[
        RouterModule,
        CommonModule,
        SharedModule
    ],
    declarations:[
        HeaderTelcoComponent,
        BreadcrumbsTelcoComponent,
        NopagefoundComponent,
        // MessagesComponent,
        // HeaderUserComponent
    ],
    exports:[
        HeaderTelcoComponent,
        BreadcrumbsTelcoComponent,
        NopagefoundComponent,
        // HeaderUserComponent
    ],

})
export class SharedTelcoModule { }