import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { TrainerRegisterComponent } from '../trainer-register/trainer-register.component';

const routes:Routes = [
  {path:'',component:RegisterComponent},
  {path:'Trainer',component:TrainerRegisterComponent},
  {path:'Login',component:LoginComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AuthenticationRoutingModule { }
