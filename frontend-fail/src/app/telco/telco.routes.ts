import { Routes, RouterModule } from '@angular/router';

import { TelcoComponent } from './telco.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ComunityComponent } from './comunity/comunity.component';
import { ContactComponent } from './contact/contact.component';

const telcoRoutes: Routes = [

    { 
        path: '', 
        component: TelcoComponent,
        children:[
          { path: 'home', component: HomeComponent },
          { path: 'about', component: AboutComponent },
          { path: 'comunity', component: ComunityComponent },
          { path: 'contact', component: ContactComponent },
          { path: '', redirectTo: '/home', pathMatch: 'full' },
        ] 
    }
  ];

export const TelcoRoutes = RouterModule.forChild( telcoRoutes);