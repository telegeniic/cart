import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditQuotationPageRoutingModule } from './edit-quotation-routing.module';

import { EditQuotationPage } from './edit-quotation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditQuotationPageRoutingModule
  ],
  declarations: [EditQuotationPage]
})
export class EditQuotationPageModule {}
