import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Location} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor, HTTPStatus } from './http-error.interceptor';
import { AppService } from './app.service';
import { AuthGuardService } from './auth-guard.service';
import { JwtHelperService,JWT_OPTIONS } from '@auth0/angular-jwt';
import { LoaderComponent } from './loader/loader.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CanDeactivateGuard } from './navigation-guard.service';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router'
import {MatDialog} from '@angular/material'





@NgModule({
  declarations: [
    AppComponent,
   

    LoaderComponent,
    NotfoundComponent,
    HomeComponent,
    
 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    

  ],
  providers: [ 
    Location,
    MatDialog,
    AuthGuardService,
    AppService,
    CanDeactivateGuard,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    HTTPStatus,
   
  ],
  bootstrap: [AppComponent],


})
export class AppModule { }
