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
    { title: 'Dashboard', url: '/', icon: 'mail' },
    { title: 'Quotation', url: '/', icon: 'paper-plane' },
    { title: 'Setings', url: '/', icon: 'heart' },
    { title: 'Logout', url: '/', icon: 'archive' },
    

  ];
 

  user$: Observable<User>;

  constructor(private storage: StorageService) {
    this.user$ = this.storage.userObservable;
  }
}