import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ConsoleComponent } from './components/console/console.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProyectsComponent } from './components/proyects/proyects.component';
import { MisionComponent } from './components/about/mision/mision.component';
import { VisionComponent } from './components/about/vision/vision.component';
import { ArquitectureComponent } from './components/about/arquitecture/arquitecture.component';
import { ComunityComponent } from './components/comunity/comunity.component';
import { IMSComponent } from './components/proyects/ims/ims.component';
import { PoliticsComponent } from './components/about/politics/politics.component';
import { CountComponent } from './components/count/count.component';
import { AdminUsersComponent } from './components/console/admin-users/admin-users.component';
import { AdminUserComponent } from './components/console/admin-users/admin-user/admin-user.component';
import { AdminNewUserComponent } from './components/console/admin-users/admin-new-user/admin-new-user.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyTokenGuard } from './guards/verify-token.guard';



const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'home', component: HomeComponent },
  {path: 'about', component: AboutComponent },
    {path: 'mision', component: MisionComponent },
    {path: 'vision', component: VisionComponent },
    {path: 'arquitecture', component: ArquitectureComponent },
    {path: 'politics', component: PoliticsComponent },
  {path: 'comunity', component: ComunityComponent },
    {path: 'comunity', component: ComunityComponent },
  {path: 'console', component: ConsoleComponent ,canActivate:[VerifyTokenGuard]},
    {path: 'admin-users', component: AdminUsersComponent },
    {path: 'console/admin-user/:id', component: AdminUserComponent },
    {path: 'console/admin-new-user', component: AdminNewUserComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'proyects', component: ProyectsComponent },
  {path: 'ims', component: IMSComponent },
  
  
  {path: 'signin', component: SigninComponent },
  {path: 'signup', component: SignupComponent },

  {path: 'count', component: CountComponent },
  {path: '**', pathMatch: 'full',redirectTo: 'home' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
