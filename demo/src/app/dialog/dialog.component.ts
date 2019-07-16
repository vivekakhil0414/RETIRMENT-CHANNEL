import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import {AppService} from '../app.service'
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER } from '@angular/cdk/overlay/typings/overlay-directives';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,private Router:Router,private appservice:AppService ) { console.log(data,'daaaaaaaaaaaaaaaaaaaaaaa')}

  ngOnInit() {
  }
  async backtoretirment(){
   await this.dialogRef.close();
    setTimeout(()=>{
      this.Router.navigate(['home'])
    },700)
    // this.Router.navigate(['home'])
  }
  registration(){
    console.log('asasasasas',this.data);
    this.appservice.registration(this.data).subscribe((data)=>{
     console.log('done data',data);

     if(data['msg'] =='User registered successfully'){
     this.appservice.openSnackBar("User registered successfully","Sucess")
     this.Router.navigate(['home']);
     this.dialogRef.close();
     }

    },err=>{
      console.log(err)
    });

  }
}

