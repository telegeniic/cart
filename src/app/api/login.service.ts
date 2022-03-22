import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { iLogin } from '../models/login.interface';
import { iResponse } from '../models/response.interface';
import { iUser } from '../models/user.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = "http://odoo.app.ngrok.io/"; //url base
  private user: iUser = {
    username: "",
    token: "",
    logedin: false
  }

  constructor(private http:HttpClient, private storage: StorageService) { }

  login(form:iLogin){
    let direccion:string = this.url+"app/login";
    this.http.post<iResponse>(direccion, form).subscribe(data => {
      this.user.username = form.user;
      this.user.logedin = JSON.parse(data.result)
      this.storage.userObservableData = this.user;
      this.storage.loggedIn = this.user.logedin;
    });
  }

  logout(){
    this.storage.loggedIn = false;
  }
}
