import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User.interface';
import { CustomError } from '../models/Error.interface';
import { LocalStorageService } from './local-storage.service';
import {Quotation} from '../models/Quotation.interface';
import {Product} from '../models/Product.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  loggedIn = false;

  private user: BehaviorSubject<User>;
  private error: BehaviorSubject<CustomError>;
  private userQuotations: BehaviorSubject<Quotation[]>;
  private productsList: BehaviorSubject<Product[]>;

  constructor(private ls: LocalStorageService) {
    const user: User = ls.getInfo('user');
    this.user = new BehaviorSubject<User>({
      username: 'Guest',
      token: '',
      logged: false
    });
    if(user != null){
      this.userObservableData = user;
      this.loggedIn = user.logged;
    }
    this.error = new BehaviorSubject<CustomError>({
      status: 200,
      message: '',
      origin: ''
    });
    this.userQuotations = new BehaviorSubject<Quotation[]>([]);
    this.productsList = new BehaviorSubject<Product[]>([]);
  }

  get userObservable(): Observable<User>{
    return this.user.asObservable();
  }

  get errorObservable(): Observable<CustomError>{
    return this.error.asObservable();
  }

  get userQuotationsObservable(): Observable<Quotation[]>{
    return this.userQuotations.asObservable();
  }

  get productsListObservable(): Observable<Product[]>{
    return this.productsList.asObservable();
  }

  set userObservableData(data: User){
    this.user.next(data);
  }
  set errorObservableData(error: CustomError){
    console.log(error);
    this.error.next(error);
  }

  set userQuotationsObservableData(quotations: Quotation[]){
    this.userQuotations.next(quotations);
  }

  set productsListObservableData(productsList: Product[]){
    this.productsList.next(productsList);
  }
}
