import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { NotfoundComponent } from './notfound/notfound.component';
import {CanDeactivateGuard} from './navigation-guard.service';
import {HomeComponent} from '../app/home/home.component'
// canActivate: [AuthGuard]

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, pathMatch: 'full'},
    { path: 'registration', loadChildren: () => import('../app/registration/registration.module').then(m => m.RegistrationModule)},
    { path: '' ,redirectTo:'home',pathMatch:'full'},
    { path: 'notfound', component: NotfoundComponent},
    
  
]


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }