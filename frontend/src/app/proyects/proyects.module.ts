
import { NgModule } from "@angular/core";

// modules
import { SharedModule } from '../proyects/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


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
        GraphNewComponent
    ],
    exports:[
        ProyectsComponent,
        InformationComponent,
        ArquitecturesComponent,
        TestsComponent,
        GraphsComponent
    ],
    imports:[
        SharedModule,
        ProyectsRoutes,
        RouterModule,
        CommonModule
    ]


})
export class ProyectsModule { }