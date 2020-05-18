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


const proyectsRoutes: Routes = [

    { 
        path: 'ims', 
        component: ProyectsComponent,
        children:[
          { path: 'information', component: InformationComponent,data:{titlePage:'Información'} },
          { path: 'arquitectures', component: ArquitecturesComponent, data : {titlePage:'Arquitecturas'} },
            { path: 'arquitecture/:id', component: ArquitectureComponent, data : {titlePage:'Arquitectura'} },
            { path: 'available', component: AvailableComponent, data : {titlePage:'Arquitecturas disponibles'} },
          { path: 'tests', component: TestsComponent, data : {titlePage:'Pruebas'} },
            { path: 'test', component: TestComponent, data : {titlePage:'Prueba'} },
            { path: 'test-new', component: NewTestComponent, data : {titlePage:'Crear prueba'} },
            { path: 'testing', component: TestingComponent, data : {titlePage:'Pruebas activas'} },
          { path: 'graphs', component: GraphsComponent, data : {titlePage:'Gráficas'} },
            { path: 'graph', component: GraphComponent, data : {titlePage:'Gráfica'} },
            { path: 'graph-new', component: GraphNewComponent, data : {titlePage:'Crear gráfica'} },
          { path: '', redirectTo: '/ims/information', pathMatch: 'full' },
        ] 
    }
  ];

export const ProyectsRoutes = RouterModule.forChild( proyectsRoutes);