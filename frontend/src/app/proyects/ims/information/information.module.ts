
import { NgModule } from "@angular/core";



// modules

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider'; 
import { BrowserModule } from '@angular/platform-browser';

// Routes
import { InformationRoutes } from './information.routes';

// Components
import { GuideTestComponent } from '../tests/guide-test/guide-test.component';
import { GuideSoftphoneComponent } from './guide-softphone/guide-softphone.component';
import { InfoTelcoIMSComponent } from './info-telco-ims/info-telco-ims.component';
import { InfoArquitectureComponent } from './info-arquitecture/info-arquitecture.component';
import { InfoTestComponent } from './info-test/info-test.component';
import { InfoGraphsComponent } from './info-graphs/info-graphs.component';
import { InfoGuidesComponent } from './info-guides/info-guides.component';
import { InfoServiceComponent } from './info-service/info-service.component';
import { InfoNFVComponent } from './info-nfv/info-nfv.component';
import { InfoIMSComponent } from './info-ims/info-ims.component';
import { InfoCWIMSComponent } from './info-cwims/info-cwims.component';
import { InfoSNMPComponent } from './info-snmp/info-snmp.component';
import { GuideReserArqComponent } from './guide-reser-arq/guide-reser-arq.component';



@NgModule({
    declarations:[
      GuideTestComponent,
      GuideSoftphoneComponent,
      InfoTelcoIMSComponent,
      InfoArquitectureComponent,
      InfoTestComponent,
      InfoGraphsComponent,
      InfoGuidesComponent,
      InfoServiceComponent,
      InfoNFVComponent,
      InfoIMSComponent,
      InfoCWIMSComponent,
      InfoSNMPComponent,
      GuideReserArqComponent
        
    ],
    exports:[
        GuideTestComponent,
        GuideSoftphoneComponent,
        InfoTelcoIMSComponent,
        InfoArquitectureComponent,
        InfoTestComponent,
        InfoGraphsComponent,
        InfoGuidesComponent
       
        
    ],
    imports:[
        // InformationRoutes,
        RouterModule,
        CommonModule,
        ChartsModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        FormsModule,
        MatSliderModule,
        ReactiveFormsModule,
        BrowserModule,
        
        
        
        
        
    ]


})
export class InformationModule { }