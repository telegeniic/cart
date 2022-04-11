import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateQuotationPageRoutingModule } from './create-quotation-routing.module';

import { CreateQuotationPage } from './create-quotation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateQuotationPageRoutingModule
  ],
  declarations: [CreateQuotationPage]
})
export class CreateQuotationPageModule {}
