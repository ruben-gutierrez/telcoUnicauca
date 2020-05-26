
import { NgModule } from "@angular/core";



// modules
import { SharedModule } from '../proyects/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider'; 
import { BrowserModule } from '@angular/platform-browser';

// Routes
import { ProyectsRoutes } from './proyects.routes';

// Components
import { ProyectsComponent } from './proyects.component';
import { InformationComponent } from './ims/information/information.component';
import { ArquitecturesComponent } from './ims/arquitectures/arquitectures.component';
import { TestsComponent } from './ims/tests/tests.component';
import { GraphsComponent } from './ims/graphs/graphs.component';

import { AvailableComponent } from './ims/arquitectures/available/available.component';
import { TestingComponent } from './ims/tests/testing/testing.component';
import { TestsCreatedComponent } from './ims/tests/tests-created/tests-created.component';
import { NewTestComponent } from './ims/tests/new-test/new-test.component';
import { TestComponent } from './ims/tests/test/test.component';
import { ArquitectureComponent } from './ims/arquitectures/arquitecture/arquitecture.component';
import { GraphComponent } from './ims/graphs/graph/graph.component';
import { GraphNewComponent } from './ims/graphs/graph-new/graph-new.component';
import { InformationTemplateComponent } from './ims/information/information-template/information-template.component';
import { GraphTemplateComponent } from './ims/graphs/graph-template/graph-template.component';
import { NewServerComponent } from './ims/arquitectures/arquitecture/new-server/new-server.component';
import { GuideTestComponent } from './ims/tests/guide-test/guide-test.component';
import { GuideSoftphoneComponent } from './ims/information/guide-softphone/guide-softphone.component';




@NgModule({
    declarations:[
        ProyectsComponent,
        InformationComponent,
        ArquitecturesComponent,
        TestsComponent,
        GraphsComponent,
        AvailableComponent,
        TestingComponent,
        TestsCreatedComponent,
        NewTestComponent,
        TestComponent,
        ArquitectureComponent,
        GraphComponent,
        GraphNewComponent,
        InformationTemplateComponent,
        GraphTemplateComponent,
        NewServerComponent,
        GuideTestComponent,
        GuideSoftphoneComponent,
        
    ],
    exports:[
        ProyectsComponent,
        InformationComponent,
        ArquitecturesComponent,
        TestsComponent,
        GraphsComponent,
        
        
    ],
    imports:[
        SharedModule,
        ProyectsRoutes,
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
export class ProyectsModule { }