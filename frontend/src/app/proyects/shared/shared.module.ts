
import { NgModule } from "@angular/core";

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



// Components


import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderUserComponent } from 'src/app/telco/shared/header-user/header-user.component';
import { MessagesComponent } from 'src/app/telco/shared/messages/messages.component';
import { LoadingComponent } from './loading/loading.component';





@NgModule({
    declarations:[
        HeaderComponent,
        BreadcrumbsComponent,
        SidebarComponent,
        HeaderUserComponent,
        MessagesComponent,
        LoadingComponent
        
    ],
    exports:[
        HeaderComponent,
        BreadcrumbsComponent,
        SidebarComponent,
        HeaderUserComponent,
        MessagesComponent,
        LoadingComponent
        

    ],
    imports:[
        RouterModule,
        CommonModule,
        
        
    ]


})
export class SharedModule { }