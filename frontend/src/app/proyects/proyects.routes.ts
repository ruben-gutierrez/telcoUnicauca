import { Routes, RouterModule } from '@angular/router';
import { ProyectsComponent } from './proyects.component';
import { InformationComponent } from './ims/information/information.component';
import { ArquitecturesComponent } from './ims/arquitectures/arquitectures.component';
import { TestsComponent } from './ims/tests/tests.component';
import { GraphsComponent } from './ims/graphs/graphs.component';
import { ArquitectureComponent } from './ims/arquitectures/arquitecture/arquitecture.component';
import { AvailableComponent } from './ims/arquitectures/available/available.component';
import { TestComponent } from './ims/tests/test/test.component';
import { NewTestComponent } from './ims/tests/new-test/new-test.component';
import { TestingComponent } from './ims/tests/testing/testing.component';
import { GraphComponent } from './ims/graphs/graph/graph.component';
import { GraphNewComponent } from './ims/graphs/graph-new/graph-new.component';
import { NewServerComponent } from './ims/arquitectures/arquitecture/new-server/new-server.component';
import { LoginGardGuard } from '../services/services.index';
import { VerifyTokenGuard } from '../services/guards/verify-token.guard';


const proyectsRoutes: Routes = [

    { 
        path: 'ims', 
        component: ProyectsComponent,
        
        children:[
          { path: 'information', component: InformationComponent,data:{titlePage:'Información'} },
          { path: 'arquitectures', component: ArquitecturesComponent,canActivate: [ LoginGardGuard, VerifyTokenGuard ], data : {titlePage:'Arquitecturas'} },
            { path: 'arquitectures/:id', component: ArquitectureComponent, data : {titlePage:'Arquitectura'} },
            { path: 'available', component: AvailableComponent ,canActivate: [ LoginGardGuard, VerifyTokenGuard ], data : {titlePage:'Arquitecturas disponibles'} },
            { path: 'arquitectures/:id/newServer', component: NewServerComponent,canActivate: [ LoginGardGuard, VerifyTokenGuard ], data : {titlePage:'Crear servidor'} },
          { path: 'tests', component: TestsComponent,canActivate: [ LoginGardGuard, VerifyTokenGuard ], data : {titlePage:'Pruebas'} },
            { path: 'tests/:id', component: TestComponent,canActivate: [ LoginGardGuard, VerifyTokenGuard ], data : {titlePage:'Prueba'} },
            { path: 'test-new', component: NewTestComponent,canActivate: [ LoginGardGuard, VerifyTokenGuard ], data : {titlePage:'Crear prueba'} },
            { path: 'testing', component: TestingComponent,canActivate: [ LoginGardGuard, VerifyTokenGuard ], data : {titlePage:'Pruebas activas'} },
          { path: 'graphs', component: GraphsComponent,canActivate: [ LoginGardGuard, VerifyTokenGuard ], data : {titlePage:'Gráficas'} },
            { path: 'graphs/:id', component: GraphComponent,canActivate: [ LoginGardGuard, VerifyTokenGuard ], data : {titlePage:'Gráfica'} },
            { path: 'graph-new', component: GraphNewComponent,canActivate: [ LoginGardGuard, VerifyTokenGuard ], data : {titlePage:'Crear gráfica'} },
          { path: '', redirectTo: '/ims/information', pathMatch: 'full' },
        ]
    }
  ];

export const ProyectsRoutes = RouterModule.forChild( proyectsRoutes);