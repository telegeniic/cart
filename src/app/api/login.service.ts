import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { iLogin } from '../modules/login.interface';
import { iResponse } from '../modules/response.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = "http://odoo.app.ngrok.io/"; //url base

  private credentials: BehaviorSubject<iResponse> = new BehaviorSubject<iResponse>({result: "false"});

  constructor(private http:HttpClient) { }

  login(form:iLogin){
    let direccion:string = this.url+"app/login";
    this.http.post<iResponse>(direccion, form).subscribe(this.credentials);
  }

  get credentialsInfo(){
    return this.credentials.asObservable();
  }
}
