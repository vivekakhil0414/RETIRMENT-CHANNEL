import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import {RegistrationRoutingModule} from './registration-routing.module';
import { MaterialModule } from '../material/material.module';
import {RegisteroptionComponent}  from './registeroption.component';
import { DialogComponent } from '../dialog/dialog.component';
import {SignupComponent} from '../signup/signup.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialog,MatDialogRef} from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[],
  declarations: [RegistrationComponent, DialogComponent, RegisteroptionComponent,SignupComponent],
  entryComponents: [DialogComponent]
})
export class RegistrationModule { }
