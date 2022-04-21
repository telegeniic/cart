import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewQuotationPage } from './view-quotation.page';

const routes: Routes = [
  {
    path: '',
    component: ViewQuotationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewQuotationPageRoutingModule {}
