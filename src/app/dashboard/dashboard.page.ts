import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuotationService } from '../api/quotation.service';
import { StorageService } from '../api/storage.service';
import { Quotation } from '../models/Quotation.interface';
import { ViewQuotationPage } from '../quotations/view-quotation/view-quotation.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  imageSources: {[id: string]: ImageHandler} = {};
  quotations: Quotation[] ;

  constructor(private storage: StorageService,
    private quotationService: QuotationService,
    private modalCtrl: ModalController
    ) {
    this.imageSources['aproved'] = {
      src: 'assets/svg/checkmark-done.svg',
      alt: 'checkmark-done'
    }
    this.imageSources['draft'] = {
      src: 'assets/svg/checkmark.svg',
      alt: 'checkmark'
    }
    this.imageSources['cancel'] = {
      src: 'assets/svg/close.svg',
      alt: 'cancel'
    }
    this.storage.userQuotationsObservable.subscribe(quotation => {
      this.quotations = quotation;
    })
  }

  ngOnInit() {
    this.quotationService.getQuotations();
  }

  testing(){
    console.log("se deslizo el elemento")
  }

  async showModal(q: Quotation){
    const modal = await this.modalCtrl.create({
      component: ViewQuotationPage,
      componentProps: {
        quotation: q
      }
    });

    await modal.present();
  }

}

interface ImageHandler{
  src: string;
  alt: string
}
