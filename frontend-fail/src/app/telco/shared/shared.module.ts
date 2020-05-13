
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';


// modules
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
// import { NoFoundPageComponent } from 'src/app/shared/no-found-page/no-found-page.component';




// Components



@NgModule({
    imports:[
        RouterModule,
        CommonModule
    ],
    declarations:[
       BreadcrumbsComponent,
       HeaderComponent,
    //    NoFoundPageComponent
    ],
    exports:[
        BreadcrumbsComponent,
        HeaderComponent,
        // NoFoundPageComponent
    ],

})
export class SharedModule { }