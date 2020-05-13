
import { NgModule } from "@angular/core";

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



// Components


import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
    declarations:[
        HeaderComponent,
        BreadcrumbsComponent,
        SidebarComponent
    ],
    exports:[
        HeaderComponent,
        BreadcrumbsComponent,
        SidebarComponent
    ],
    imports:[
        RouterModule,
        CommonModule
    ]


})
export class SharedModule { }