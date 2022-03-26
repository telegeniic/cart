import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login.interface';
import { Response } from '../models/response.interface';
import { User } from '../models/user.interface';
import { StorageService } from './storage.service';
import { LoginError } from '../models/loginError.interface';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'https://odoo.app.ngrok.io/'; //url base
  private user: User;
  private error: LoginError;

  constructor(private http: HttpClient,
              private storage: StorageService,
              private ls: LocalStorageService) {
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
      this.user.token = data.token;
      this.storage.userObservableData = this.user;
      this.storage.loggedIn = this.user.logged;
    },
      error => {
      this.error.status = error.status;
      this.error.message = error.error.error;
      this.storage.loginErrorObservableData = this.error;
      });
  }

  logout(){
    this.user = {
      username: '',
      token: '',
      logged: false
    };
    this.ls.deleteInfo('user');
    this.storage.loggedIn = false;
    this.storage.userObservableData = this.user;
  }
}
