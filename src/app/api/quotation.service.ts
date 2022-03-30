import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {HttpClient} from '@angular/common/http';
import {Quotation} from '../models/Quotation.interface';
import {ErrorsService} from './errors.service';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  private url = 'https://odoo.app.ngrok.io/'; //base url

  constructor(private storage: StorageService,
              private http: HttpClient,
              private handler: ErrorsService) {
  }

  getQuotations(){
    const direction = this.url+'app/get/cotizaciones';
    this.http.get(direction)
      .subscribe(data => {
        console.log(data, 'get data');
        this.storage.userQuotationsObservableData = this.quotationParser(data);
        this.handler.noError();
      });
  }

  quotationParser(data: any): Quotation[]{
    console.log(data);
    return data.cotizaciones.map(d => {
      const message: Quotation = {
        amountTotal: d.amount_total,
        amountUntaxed: d.amount_untaxed,
        createDate: d.create_date,
        dateOrder: d.date_order,
        id: d.id,
        name: d.name,
        orderLine: [],
        partnerAppName: d.partner_app_name,
        state: d.state,
        amountTax: d.amount_tax
      };
      return message;
    });
  }
}
