import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent } from './registration.component';
import { CanDeactivateGuard } from '../navigation-guard.service';
import {RegisteroptionComponent} from './registeroption.component'
import {SignupComponent } from '../signup/signup.component'
const routes: Routes = [
    { path: 'register', component: RegistrationComponent },
    { path: 'registeroption', component: RegisteroptionComponent },
    { path: 'login', component: SignupComponent }
    
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})

export class RegistrationRoutingModule { }