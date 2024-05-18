import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { CatalogComponent } from './components/main/catalog/catalog.component';
import { CoachDetailsComponent } from './components/main/coach-details/coach-details.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'catalog',component:CatalogComponent},
  {path:'trainer-details',component:CoachDetailsComponent},
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
