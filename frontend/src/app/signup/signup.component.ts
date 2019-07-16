import { Component, Input,OnChanges,  OnDestroy } from '@angular/core';
import {  FormGroup,FormBuilder,Validators} from '@angular/forms';
import { AppService } from '../app.service';
import {Router,ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnDestroy {
  subscription: Subscription;
  registerForm: FormGroup;
  loginMethod: Boolean = true;
  inputType: string = 'password';
  loginEmailType: string='password'
  signUpForm: FormGroup;
  firstName : string;
  lastName  : string;
  password  : string;
  email     : string;
  mail      : string;
  pass      : string;
  loginForm : FormGroup;
  show: Boolean = false;
  constructor(private formBuilder: FormBuilder, private appService: AppService, private router: Router, private activateRoutes: ActivatedRoute) {
    this.registerForm = this.formBuilder.group({
      Username: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
   toggleLoginInputType(){
     if(this.loginEmailType=="password"){
       this.loginEmailType="text"
     }else if(this.loginEmailType=="text"){
      this.loginEmailType="password"
    }
   }
   toggleInputType(){
    if(this.inputType=="password"){
      this.inputType="text"
    }else if(this.inputType=="text"){
     this.inputType="password"
   }
  }
  movetonotfound(){
    this.router.navigate(['notfound'])
  }
  showpassword() {
    this.show = !this.show;
  }
   passwordMatchValidator = (group: FormGroup) => {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    if(password !== confirmPassword){ 
      return group.get('confirmPassword').setErrors({'matchPassword': true})
    }
  };
  
  
  moveRegistration(){

    this.router.navigate(['registration/registeroption'])
  }

  onSubmit(){
    let value=this.registerForm.value
    let obj = {
      workemail: value.Username,
      password: value.Password
    }
   this.appService.login(obj).subscribe((data:any)=>{
      console.log("login data",data);
      if(data['msg']=='login successfull'){
        this.appService.openSnackBar("Login Successfull","Sucess");
        localStorage.setItem('user',btoa(JSON.stringify(data.data)))
        this.router.navigate(['home']);
      }
      else if(data.error== true){
        this.appService.openSnackBar(data['msg'],"Sucess");
            return;
      }
      // if(data.error){
      //   this.appService.openSnackBar("Invalid Credentials","Sucess")
      // }else{
       
      // }
       // formDirective.resetForm();
      //  this.loginForm.reset();
        
    
    })
  }
  ngOnDestroy(){
    (this.subscription)?this.subscription.unsubscribe() : '';
  }
}