import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User.interface';
import { Error } from '../models/Error.interface';
import { LocalStorageService } from './local-storage.service';
import { Quotation } from '../models/Quotation';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  loggedIn = false;

  private user: BehaviorSubject<User>;
  private error: BehaviorSubject<Error>;
  private userQuotations: BehaviorSubject<Quotation[]>;

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
    this.error = new BehaviorSubject<Error>({
      status: 200,
      message: ''
    });
    this.userQuotations = new BehaviorSubject<Quotation[]>(null);
  }

  get userObservable(): Observable<User>{
    return this.user.asObservable();
  }

  get errorObservable(): Observable<Error>{
    return this.error.asObservable();
  }

  get userQuotationsObservable(): Observable<Quotation[]>{
    return this.userQuotations.asObservable();
  }

  set userObservableData(data: User){
    this.ls.saveInfo('user', data);
    this.user.next(data);
  }
  set errorObservableData(error: Error){
    this.error.next(error);
  }

  set userQuotationsObservableData(quotations: Quotation[]){
    this.userQuotations.next(quotations);
  }
}
