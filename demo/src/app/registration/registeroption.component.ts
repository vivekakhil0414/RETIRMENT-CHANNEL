import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import {Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
    selector: 'registeroption-component',
    templateUrl: './registeroption.component.html',
    styleUrls: ['./registeroption.component.css']
})
export class RegisteroptionComponent implements OnInit,OnDestroy {
    public userData;
    private userProductSubscription: Subscription;
    constructor(private Router:Router, private AppService: AppService){
    }
 async ngOnInit(){
     const userId = localStorage.getItem('id')
//    this.userProductSubscription = await this.AppService.getUserProducts(userId).subscribe((data)=>{
//         this.userData = data['data'];
//     })
 }
 ngOnDestroy(){
     (this.userProductSubscription)?this.userProductSubscription.unsubscribe():'';
 }  
 gotoregistration(){
    this.Router.navigate(['registration/register'])
}
   // this.Router.navigate(['registeroption'])
  
}
