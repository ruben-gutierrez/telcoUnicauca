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
import { AdminGuard } from './guards/admin.guard';
import { AvailableComponent } from './components/proyects/ims/available/available.component';
import { ReservedComponent } from './components/proyects/ims/reserved/reserved.component';
import { TestComponent } from './components/proyects/ims/test/test.component';
import { GraphicsComponent } from './components/proyects/ims/graphics/graphics.component';
import { ArquitectureImsComponent } from './components/proyects/ims/arquitecture-ims/arquitecture-ims.component';
import { TestsComponent } from './components/proyects/ims/tests/tests.component';
import { AdminProyectsComponent } from './components/console/admin-proyects/admin-proyects.component';
import { AdminNewProyectComponent } from './components/console/admin-proyects/admin-new-proyect/admin-new-proyect.component';
import { AdminProyectComponent } from './components/console/admin-proyects/admin-proyect/admin-proyect.component';
import { AdminNewArquitectureComponent } from './components/console/admin-proyects/admin-new-arquitecture/admin-new-arquitecture.component';
import { EditArquitectureComponent } from './components/console/admin-proyects/admin-proyect/edit-arquitecture/edit-arquitecture.component';
import { GraphComponent } from './components/proyects/ims/graph/graph.component';
import { NewGraphComponent } from './components/proyects/ims/new-graph/new-graph.component';
import { NewTestComponent } from './components/proyects/ims/new-test/new-test.component';



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
  {path: 'console', component: ConsoleComponent ,canActivate:[VerifyTokenGuard, AdminGuard]},
    {path: 'admin-proyects', component: AdminProyectsComponent ,canActivate:[VerifyTokenGuard, AdminGuard]},
      {path: 'console/admin-new-proyect', component: AdminNewProyectComponent ,canActivate:[VerifyTokenGuard, AdminGuard]},
      {path: 'console/admin-proyect/:id', component: AdminProyectComponent ,canActivate:[VerifyTokenGuard, AdminGuard]},
      {path: 'console/admin-proyect/:id/edit-arquitecture/:idArquitecture', component: EditArquitectureComponent ,canActivate:[VerifyTokenGuard, AdminGuard]},
        {path: 'console/admin-proyect/:id/new-arquitecture', component: AdminNewArquitectureComponent ,canActivate:[VerifyTokenGuard, AdminGuard]},
    {path: 'admin-users', component: AdminUsersComponent },
      {path: 'console/admin-user/:id', component: AdminUserComponent },
      {path: 'console/admin-new-user', component: AdminNewUserComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'proyects', component: ProyectsComponent },
    {path: 'ims', component: IMSComponent },
      {path: 'ims/available', component: AvailableComponent },
      {path: 'ims/reserved', component: ReservedComponent },
      {path: 'ims/reserved/:id', component: ArquitectureImsComponent },
      {path: 'ims/tests', component: TestsComponent },
        {path: 'ims/tests/:id', component: TestsComponent },
        {path: 'ims/test/:id', component: TestComponent },
        {path: 'ims/testNew', component: NewTestComponent }, 
      {path: 'ims/graphics', component: GraphicsComponent },
        {path: 'ims/graphics/:id/server', component: GraphicsComponent },
        {path: 'ims/graphics/:id/arquitecture', component: GraphicsComponent },
        {path: 'ims/graph/:id', component: GraphComponent },
        // {path: 'ims/graphNew', component: NewGraphComponent },
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
