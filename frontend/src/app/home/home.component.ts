import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private Router:Router) { }
 user=null;
  ngOnInit() {
    try{
      this.user=JSON.parse(atob(localStorage.getItem('user')));
    }catch(e){
      this.user=null;
    }
    console.log(this.user)
  }
  gotoregistration(){
      this.Router.navigate(['registration/registeroption'])
    }
    backtologin(){
      this.Router.navigate(['registration/login'])
     }
     logout(){
       localStorage.clear();
       this.  user=null;
     }
}
