import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from './api/login.service';
import {StorageService} from './api/storage.service';
import {AlertController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class SessionsGuard implements CanActivate {

  private loggedIn = false;

  constructor(private storage: StorageService, private alertCtrl: AlertController, private router: Router){
    storage.userObservable.subscribe(user => {
      this.loggedIn = user.logged;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.loggedIn) {
      console.log('you dont have access to this site');
      this.presentAlert().then(r => this.router.navigateByUrl('/login'));
    }
    return this.loggedIn;
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Not Allowed',
      message: 'Please log in before enter this site.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
