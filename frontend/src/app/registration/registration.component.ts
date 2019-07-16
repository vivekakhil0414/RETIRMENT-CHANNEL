import { Component ,OnInit,ChangeDetectorRef} from '@angular/core';
import { AppService } from '../app.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'registration-login',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit  {

  
  allProducts: Observable<any>;
  firstName:string
  lastName:string
  SurName:string
  companyName:string
  office:string
  workEmail:string
  workPhone:string
  Username:string
  Password:string
  repassword:string
  mailPattern :string
  userProducts: Array<String> = [];
  registerForm: FormGroup;

  subscriptions: Array<Subscription> = [ ];
  constructor(public appService: AppService,private dialog: MatDialog,  private formBuilder: FormBuilder, public router: Router, public matDialog: MatDialog) {
   
   }


   ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      Nickname: [''],
      SurName: ['', Validators.required],
      companyName: ['', Validators.required],
      office: ['', Validators.required],
      workemail: ['', [Validators.required, Validators.pattern(this.mailPattern)]],
      workephone: ['', [Validators.required, Validators.pattern(/^\d{10}/)]],
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]]
    }, {
        validator: this.passwordMatchValidator
      }
    );
   
  }
  onSubmit(){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height: '600px',
      panelClass: 'DialogComponent',
      data:this.registerForm.value,

      position: {
        top: '30px'
      }
    });
    this.registerForm.reset()

  }

  setRgex(){
    
   this.mailPattern=  `([a-zA-Z0-9_/\-/\.]+)@(${this.companyName.trim()}.com)$`;    //`^([\w]*[\w\.]*(?!\.)@${this.companyName.trim()}.com)`
  }
  passwordMatchValidator = (group: FormGroup) => {
    console.log(group,'grouppppp')
    let obj = {}
    obj['matchEmail'] = false
    obj['matchPassword'] = false
    let pass = group.controls.password.value;
    let confirmPass = group.controls.repassword.value;
    let status 
    if( pass === confirmPass ) { 
      status =  null 
    } else {
      
      obj['matchPassword']= true 
       status = obj
    }

    if(this.companyName && this.companyName.length > 0 && group.controls.workemail.value){
    let mail = group.controls.workemail.value;
    let maiRgx =  new RegExp( this.mailPattern);
    console.log(maiRgx.test(mail),maiRgx,'testtttttter')
      
       if( maiRgx.test(mail)) { 
        status =  null 
      } else {
        
        obj['matchEmail']= true 
         status = obj
      }
    }
      return status
  };

}
