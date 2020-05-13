import { Routes, RouterModule } from '@angular/router';

import { TelcoComponent } from './telco.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ComunityComponent } from './comunity/comunity.component';

const telcoRoutes: Routes = [

    { 
        path: '', 
        component: TelcoComponent,
        children:[
          { path: 'home', component: HomeComponent, data:{titlePage: 'Inicio'} },
          { path: 'about', component: AboutComponent, data:{titlePage: 'Nosotros'} },
          { path: 'comunity', component: ComunityComponent, data:{titlePage: 'Comunidad'} },
          { path: '', redirectTo: '/home', pathMatch: 'full' },
        ] 
    }
  ];

export const TelcoRoutes = RouterModule.forChild( telcoRoutes);