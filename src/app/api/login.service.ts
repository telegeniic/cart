import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login.interface';
import { Response } from '../models/response.interface';
import { User } from '../models/user.interface';
import { StorageService } from './storage.service';
import { LoginError } from '../models/loginError.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'https://odoo.app.ngrok.io/'; //url base
  private readonly user: User;
  private error: LoginError;

  constructor(private http: HttpClient, private storage: StorageService) {
    this.user = {
      username: '',
      token: '',
      logged: false
    };
    this.error = {
      status: 200,
      message: ''
    };
  }

  login(form: Login){
    const direction: string = this.url+'app/login';
    this.http.post<Response>(direction, form).subscribe(data => {
      this.user.username = form.user;
      this.user.logged = JSON.parse(data.result);
      this.storage.userObservableData = this.user;
      this.storage.loggedIn = this.user.logged;
    },
      error => console.log(error));
  }

  logout(){
    this.storage.loggedIn = false;
  }
}
