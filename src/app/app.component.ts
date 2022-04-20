import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './api/storage.service';
import { User } from './models/User.interface';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/', icon: 'build' },
    { title: 'Quotation', url: '/', icon: 'folder'},
    { title: 'Setinsg', url: '/', icon: 'newspaper'},
    { title: 'Logout', url: './login/login.module', icon: 'log-out' },
    

  ];
 
  user$: Observable<User>;

  constructor(private storage: StorageService) {
    this.user$ = this.storage.userObservable;
  }

}