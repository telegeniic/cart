import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../api/storage.service';
import { Quotation } from '../models/quotation.interface';
import {LoginService} from '../api/login.service';
import {QuotationService} from '../api/quotation.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  quotations: Quotation[];

  constructor(
    private storage: StorageService,
    private router: Router,
    private alertController: AlertController,
    private login: LoginService,
    private quotationService: QuotationService) {
    if(!this.storage.loggedIn) {this.presentAlert().then(() => this.router.navigateByUrl('login'));}
  }

  ngOnInit() {
    this.quotations = [
      {
        numberId: 'S00001',
        creationDate: new Date(),
        customer: 'Administrator',
        salesperson: 'Administrator',
        nextActivity: 'pend',
        total: 175.16,
        status: 'Quotation'
      },
      {
        numberId: 'S00001',
        creationDate: new Date(),
        customer: 'Administrator',
        salesperson: 'Administrator',
        nextActivity: 'pend',
        total: 175.16,
        status: 'Quotation'
      }
    ];
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: 'Unauthorized',
      subHeader: 'Not logged in',
      message: 'You must log in before enter this page.',
      buttons: ['OK']
    });

    await alert.present();
  }

  logout(){
    this.login.logout();
    this.router.navigateByUrl('/');
  }

  getQuotations(){
    this.quotationService.getQuotations();
  }

}
