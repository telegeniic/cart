import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Quotation } from 'src/app/models/Quotation.interface';

@Component({
  selector: 'app-view-quotation',
  templateUrl: './view-quotation.page.html',
  styleUrls: ['./view-quotation.page.scss'],
})
export class ViewQuotationPage implements OnInit {

  @Input() quotation: Quotation;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async close(){
    await this.modalController.dismiss();
  }

}
