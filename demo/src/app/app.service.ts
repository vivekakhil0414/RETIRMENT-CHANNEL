import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  // baseUrl="http://13.233.164.239/api/";
  baseUrl="http://localhost:3002/"
  constructor(private http: HttpClient, private router:Router ,private snackbar: MatSnackBar,public jwtHelper: JwtHelperService) {}
    loginStatus = new BehaviorSubject(true);
    isLoggedIn = new BehaviorSubject('false');
    backbutton:Boolean = false;

  openSnackBar(message: any, action: any) {
    this.snackbar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top', 
      horizontalPosition: 'end'

    });
  }
  
  login(loginObject){
    return this.http.post(`${this.baseUrl}user/login`, loginObject);
   }

registration(obj){
  console.log("abc",obj);
  return this.http.post(`${this.baseUrl}register`, {...obj})
}

}
