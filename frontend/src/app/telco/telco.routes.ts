import { Routes, RouterModule } from '@angular/router';

import { TelcoComponent } from './telco.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ComunityComponent } from './comunity/comunity.component';
import { ConsoleComponent } from './console/console.component';
import { AdminUserComponent } from './console/admin-users/admin-user/admin-user.component';
import { AdminProyectComponent } from './console/admin-proyects/admin-proyect/admin-proyect.component';
import { AdminEditArquitectureComponent } from './console/admin-proyects/admin-edit-arquitecture/admin-edit-arquitecture.component';
import { AdminNewArquitectureComponent } from './console/admin-proyects/admin-new-arquitecture/admin-new-arquitecture.component';
import { AdminNewProyectComponent } from './console/admin-proyects/admin-new-proyect/admin-new-proyect.component';
import { AdminNewUserComponent } from './console/admin-users/admin-new-user/admin-new-user.component';
import { LoginGardGuard } from '../services/services.index';
import { ContactTelcoComponent } from './contact-telco/contact-telco.component';

const telcoRoutes: Routes = [

    { 
        path: '', 
        component: TelcoComponent,
        // canActivate: [ LoginGardGuard ],
        children:[
          { path: 'home', component: HomeComponent, data:{titlePage: 'Inicio'} },
          { path: 'about', component: AboutComponent, data:{titlePage: 'Nosotros'} },
          { path: 'comunity', component: ComunityComponent, data:{titlePage: 'Comunidad'} },
          { path: 'contact', component: ContactTelcoComponent, data:{titlePage: 'Contacto'} },
          { path: 'console', component: ConsoleComponent, data:{titlePage: 'Consola'} },
            { path: 'console/admin-user/:id', component: AdminUserComponent, data:{titlePage: 'Usuario'} },
            { path: 'console/admin-proyect/:id', component: AdminProyectComponent, data:{titlePage: 'Proyectos'} },
            { path: 'console/admin-edit-arquitecture/:id', component: AdminEditArquitectureComponent, data:{titlePage: 'Editar Arquitectura'} },
            { path: 'console/admin-proyect/:id/new-arquitecture', component: AdminNewArquitectureComponent , data:{titlePage: 'Crear Arquitectura'} },
            { path: 'console/admin-new-proyect', component: AdminNewProyectComponent , data:{titlePage: 'Crear Proyecto'} },
            { path: 'console/admin-new-user', component: AdminNewUserComponent , data:{titlePage: 'Crear Usuario'} },
          { path: '', redirectTo: '/home', pathMatch: 'full' },
        ] 
    }
  ];

export const TelcoRoutes = RouterModule.forChild( telcoRoutes);