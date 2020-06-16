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
import { InfoArquitectureComponent } from './ims/information/info-arquitecture/info-arquitecture.component';
import { InformationTemplateComponent } from './ims/information/information-template/information-template.component';
import { InfoTestComponent } from './ims/information/info-test/info-test.component';
import { InfoGraphsComponent } from './ims/information/info-graphs/info-graphs.component';
import { InfoGuidesComponent } from './ims/information/info-guides/info-guides.component';
import { InfoServiceComponent } from './ims/information/info-service/info-service.component';
import { InfoNFVComponent } from './ims/information/info-nfv/info-nfv.component';
import { InfoIMSComponent } from './ims/information/info-ims/info-ims.component';
import { InfoCWIMSComponent } from './ims/information/info-cwims/info-cwims.component';
import { InfoSNMPComponent } from './ims/information/info-snmp/info-snmp.component';
import { GuideReserArqComponent } from './ims/information/guide-reser-arq/guide-reser-arq.component';

const proyectsRoutes: Routes = [

    { 
        path: 'ims', 
        component: ProyectsComponent,
        
        children:[
          { 
            path: 'information',
            component: InformationComponent,
            children:[
              { path: 'all', component: InformationTemplateComponent, data : {titlePage:'Informacion'} },
              { path: 'arquitectures', component: InfoArquitectureComponent, data : {titlePage:'Informacion arquitecturas'} },
              { path: 'tests', component: InfoTestComponent, data : {titlePage:'Informacion pruebas'} },
              { path: 'graphs', component: InfoGraphsComponent, data : {titlePage:'Informacion gráficas'} },
              { path: 'guides', component: InfoGuidesComponent, data : {titlePage:'Guías'} },
              { path: 'servicios', component: InfoServiceComponent, data : {titlePage:'Servicios'} },
              { path: 'NFV', component: InfoNFVComponent, data : {titlePage:'NFV'} },
              { path: 'IMS/NGN', component: InfoIMSComponent, data : {titlePage:'IMS/NGN'} },
              { path: 'ClearwaterIMS', component: InfoCWIMSComponent, data : {titlePage:'Clearwater IMS'} },
              { path: 'SNMP', component: InfoSNMPComponent, data : {titlePage:'SNMP'} },
              { path: 'Guide_Reser_Arq', component: GuideReserArqComponent, data : {titlePage:'Reservar Arquitectura'} },
              { path: '', redirectTo: '/ims/information/all' , pathMatch: 'full' },
            ],
            data:{titlePage:'Información'} 
          },
          // { path: 'arquitectures', component: ArquitecturesComponent,canActivate: [  VerifyTokenGuard ], data : {titlePage:'Arquitecturas'} },
          { path: 'arquitectures', component: ArquitecturesComponent,canActivate: [ VerifyTokenGuard ], data : {titlePage:'Arquitecturas'} },
            { path: 'arquitectures/:id', component: ArquitectureComponent, data : {titlePage:'Arquitectura'} },
            { path: 'available', component: AvailableComponent ,canActivate: [  VerifyTokenGuard ], data : {titlePage:'Arquitecturas disponibles'} },
            { path: 'arquitectures/:id/newServer', component: NewServerComponent,canActivate: [  VerifyTokenGuard ], data : {titlePage:'Crear servidor'} },
          { path: 'tests', component: TestsComponent,canActivate: [  VerifyTokenGuard ], data : {titlePage:'Pruebas'} },
            { path: 'tests/:id', component: TestComponent,canActivate: [  VerifyTokenGuard ], data : {titlePage:'Prueba'} },
            { path: 'test-new', component: NewTestComponent,canActivate: [  VerifyTokenGuard ], data : {titlePage:'Crear prueba'} },
            { path: 'testing', component: TestingComponent,canActivate: [  VerifyTokenGuard ], data : {titlePage:'Pruebas activas'} },
          { path: 'graphs', component: GraphsComponent,canActivate: [  VerifyTokenGuard ], data : {titlePage:'Gráficas'} },
            { path: 'graphs/:id', component: GraphComponent,canActivate: [  VerifyTokenGuard ], data : {titlePage:'Gráfica'} },
            { path: 'graph-new', component: GraphNewComponent,canActivate: [  VerifyTokenGuard ], data : {titlePage:'Crear gráfica'} },
          { path: '', redirectTo: '/ims/information', pathMatch: 'full' },
        ]
    }
  ];

export const ProyectsRoutes = RouterModule.forChild( proyectsRoutes);