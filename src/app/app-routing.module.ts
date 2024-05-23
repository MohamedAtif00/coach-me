import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { CatalogComponent } from './components/main/catalog/catalog.component';
import { CoachDetailsComponent } from './components/main/coach-details/coach-details.component';
import { AddPlanComponent } from './components/main/add-plan/add-plan.component';
import { PlansComponent } from './components/main/plans/plans.component';
import { ChatComponent } from './components/main/chat/chat.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'catalog',component:CatalogComponent},
  {path:'trainer-details/:id',component:CoachDetailsComponent},
  {path:'add-plan',component:AddPlanComponent},
  {path:'plans',component:PlansComponent},
  {path:'chat',component:ChatComponent},
  {
    path:'auth',
    loadChildren:()=>import('./authentication/authentication.module').then(x =>x.AuthenticationModule)
  }
    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
