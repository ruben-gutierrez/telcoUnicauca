import { Routes, RouterModule } from '@angular/router';


// Components
import { InformationComponent } from './information.component';
import { InfoArquitectureComponent } from './info-arquitecture/info-arquitecture.component';
import { InfoTestComponent } from './info-test/info-test.component';
import { InfoGraphsComponent } from './info-graphs/info-graphs.component';
import { InfoGuidesComponent } from './info-guides/info-guides.component';
import { InformationTemplateComponent } from './information-template/information-template.component';
import { InfoServiceComponent } from './info-service/info-service.component';
import { InfoNFVComponent } from './info-nfv/info-nfv.component';
import { InfoIMSComponent } from './info-ims/info-ims.component';
import { InfoCWIMSComponent } from './info-cwims/info-cwims.component';
import { InfoSNMPComponent } from './info-snmp/info-snmp.component';
import { GuideReserArqComponent } from './guide-reser-arq/guide-reser-arq.component';


const informationRoutes: Routes = [

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
  ];

export const InformationRoutes = RouterModule.forChild( informationRoutes);