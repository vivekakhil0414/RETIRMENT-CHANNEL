import { HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, tap, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';
@Injectable()
export class HTTPStatus {
  public showLoader: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {
   }

  setHttpStatus(inFlight: boolean) {
    if(inFlight === false){
      setTimeout(()=>{
        this.showLoader.next(inFlight);
      },2000)
    }else{

      this.showLoader.next(inFlight);
    }
  }

  getHttpStatus(): Observable<boolean> {
    return this.showLoader.asObservable();
  }
}

@Injectable()
  export class HttpErrorInterceptor  {
  requestCounter: Number = 0;
  responseCounter: Number = 0; 
  constructor(private httpstatus: HTTPStatus, private appService: AppService){}
  }