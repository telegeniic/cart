import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../api/storage.service';
import { iQuotation } from '../models/quotation.interface';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  quotations:iQuotation[] = [
    {
      number: "S00001",
      creationDate: new Date(),
      customer: "Administrator",
      salesperson: "Administrator",
      nextActivity: "pend",
      total: 175.16,
      status: "Quotation"
    },
    {
      number: "S00001",
      creationDate: new Date(),
      customer: "Administrator",
      salesperson: "Administrator",
      nextActivity: "pend",
      total: 175.16,
      status: "Quotation"
    }
  ];

  constructor(private storage: StorageService,
    private router: Router,
    private alertController: AlertController) {
    if(!this.storage.loggedIn) this.presentAlert()
  }

  ngOnInit() {
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
    this.router.navigateByUrl("login")

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
