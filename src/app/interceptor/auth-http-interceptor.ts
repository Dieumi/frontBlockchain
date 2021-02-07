import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
        const authorization = localStorage.getItem("token")
    
        let authReq
        if(authorization ){
           authReq = req.clone({
            headers: req.headers
            .set('Content-type', 'application/json')
            .set("Authorization","Bearer "+authorization)
          });
        }else{
           authReq =req
        }
        
          console.log("req"+JSON.stringify(authReq)); // to do check middleware back
          return next.handle(authReq);
    }
}
