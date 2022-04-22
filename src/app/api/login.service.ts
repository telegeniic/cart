import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/Login.interface';
import { Response } from '../models/Response.interface';
import { User } from '../models/User.interface';
import { StorageService } from './storage.service';
import {LocalStorageService} from './local-storage.service';
import {ErrorsService} from './errors.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private url = 'https://odoo.app.ngrok.io/'; //url base
  private readonly guestUser: User = {
    username: 'Guest',
    token: '',
    logged: false
  };
  private user: User;

  constructor(private http: HttpClient,
              private storage: StorageService,
              private ls: LocalStorageService,
              private handler: ErrorsService) {
    this.user = {...this.guestUser};
  }

  login(form: Login){
    const direction: string = this.url+'app/login';
    this.http.post<Response>(direction, form).subscribe(data => {
      this.storage.loggedIn = JSON.parse(data.result);
      this.user.username = form.user;
      this.user.logged = JSON.parse(data.result);
      this.user.token = data.token;
      this.storage.userObservableData = this.user;
      this.ls.saveInfo('user', this.user);
      this.handler.noError();
    });
  }

  async logout(){
    this.ls.deleteInfo('user');
    this.ls.saveInfo('user', this.guestUser);
    this.storage.loggedIn = false;
    this.storage.userObservableData = this.guestUser;
  }


}
