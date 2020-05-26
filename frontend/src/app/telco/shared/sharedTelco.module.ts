
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';


// modules
import { RouterModule } from '@angular/router';




// Components
import { HeaderTelcoComponent } from './header-telco/header-telco.component';
import { BreadcrumbsTelcoComponent } from './breadcrumbs-telco/breadcrumbs-telco.component';
import { NopagefoundComponent } from 'src/app/shared/nopagefound/nopagefound.component';
import { SharedModule } from 'src/app/proyects/shared/shared.module';





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
        

    ],
    exports:[
        HeaderTelcoComponent,
        BreadcrumbsTelcoComponent,
        NopagefoundComponent,
     
        
    ],

})
export class SharedTelcoModule { }