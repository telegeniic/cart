import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewQuotationPageRoutingModule } from './view-quotation-routing.module';

import { ViewQuotationPage } from './view-quotation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewQuotationPageRoutingModule
  ],
  declarations: [ViewQuotationPage]
})
export class ViewQuotationPageModule {}
