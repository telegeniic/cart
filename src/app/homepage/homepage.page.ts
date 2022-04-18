import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import { StorageService } from '../api/storage.service';
import {LoginService} from '../api/login.service';
import {QuotationService} from '../api/quotation.service';
import {Quotation} from '../models/Quotation.interface';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  quotations: Quotation[];
  private loader = false;

  constructor(
    private storage: StorageService,
    private router: Router,
    private alertController: AlertController,
    private login: LoginService,
    private quotationService: QuotationService,
    private loadingController: LoadingController) {
    this.storage.userQuotationsObservable.subscribe(data  => {
      this.quotations = data;
    });
    this.storage.errorObservable.subscribe(e => {
      if(e.status !== 200){
        this.presentAlert(e.message).then(() => this.router.navigateByUrl('login'));
      }
    });
  }

  ngOnInit() {
    this.quotationService.getQuotations();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: 'Unauthorized',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  logout(){
    this.login.logout();
    this.router.navigateByUrl('/').then();
  }

  async presentLoading() {
    this.loader = true;
    const loading = await this.loadingController.create({
      //cssClass: 'my-custom-class',
      message: 'Please wait...',
      //duration: 2000
    });
    await loading.present();
    console.log('Loading dismissed!');
  }

}
