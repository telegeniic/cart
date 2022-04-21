import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ErrorsService} from '../api/errors.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private handler: ErrorsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = 'Bearer ';
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      token = 'Bearer '+user.token;
    }
    const authReq = request.clone({
      headers: request.headers.set('Authorization', token)
    });
    console.log('using interceptor', token);
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('catching error',error);
        this.handler.errorHandler(error);
        return EMPTY;
      })
    );
  }
}
