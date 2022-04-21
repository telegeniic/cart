import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './api/storage.service';
import { User } from './models/User.interface';
import {LoginService} from './api/login.service';
import {AlertController} from '@ionic/angular';
import {Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/', icon: 'mail' },
    { title: 'Quotation', url: '/', icon: 'paper-plane' },
    { title: 'Settings', url: '/', icon: 'heart' }
  ];

  user$: Observable<User>;

  constructor(private storage: StorageService, private login: LoginService, private alertCtrl: AlertController,
              private router: Router) {
    this.user$ = this.storage.userObservable;
  }

  logout(){
    this.router.navigateByUrl('/login').then(r => this.login.logout());
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Logout',
      message: 'Want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            // Cancel
          }
        }, {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

}
