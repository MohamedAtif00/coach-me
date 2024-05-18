import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationRoutingModule } from './authentication-routing/authentication-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';




@NgModule({
  declarations: [
    AdminLoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
