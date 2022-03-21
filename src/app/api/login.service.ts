import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iLogin } from '../modules/login.interface';
import { iResponse } from '../modules/response.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = "http://27dd-187-190-178-65.ngrok.io/"; //url base

  constructor(private http:HttpClient) { }

  login(form:iLogin):Observable<iResponse>{
    let direccion:string = this.url+"app/login";
    return this.http.post<iResponse>(direccion, form);
  }
}
