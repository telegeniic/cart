import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { iUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private user: BehaviorSubject<iUser> = new BehaviorSubject<iUser>({
    username: "Guest",
    token: "",
    logedin: false
  })

  constructor() { }

  get userObservable(): Observable<iUser>{
    return this.user.asObservable();
  }

  set userObservableData(data: iUser){
    this.user.next(data);

  }
}
