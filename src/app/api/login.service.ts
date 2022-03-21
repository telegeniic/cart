import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iLogin } from '../modules/login.interface';
import { iResponse } from '../modules/response.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = "http://de98-187-190-178-65.ngrok.io/app/";

  constructor(private http:HttpClient) { }

  login(form:iLogin):Observable<iResponse>{
    let direccion:string = this.url+"login";
    return this.http.post<iResponse>(direccion, form);
  }
}
