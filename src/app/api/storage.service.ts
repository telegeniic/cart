import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.interface';
import {LoginError} from '../models/loginError.interface';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  loggedIn = false;

  private user: BehaviorSubject<User>;
  private error: BehaviorSubject<LoginError>;
  constructor(private ls: LocalStorageService) {
    const user = ls.getInfo('user');
    this.user = new BehaviorSubject<User>({
      username: 'Guest',
      token: '',
      logged: null
    });
    if(user != null){
      this.userObservableData = user;
      this.loggedIn = true;
    }
    this.error = new BehaviorSubject<LoginError>({
      status: 200,
      message: ''
    });
  }

  get userObservable(): Observable<User>{
    return this.user.asObservable();
  }

  get loginErrorObservable(): Observable<LoginError>{
    return this.error.asObservable();
  }

  set userObservableData(data: User){
    this.ls.saveInfo('user', data);
    this.user.next(data);
  }
  set loginErrorObservableData(error: LoginError){
    this.error.next(error);
  }
}
