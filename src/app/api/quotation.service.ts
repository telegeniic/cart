import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {HttpClient} from '@angular/common/http';
import {OrderLine, Quotation} from '../models/Quotation.interface';
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
        orderLine: this.orderLineParser(d.order_line),
        partnerAppName: d.partner_app_name,
        state: d.state,
        amountTax: d.amount_tax
      };
      return message;
    });
  }

  orderLineParser(order: any): OrderLine[]{
    console.log(order);
    return order.map(o => {
      const trans: OrderLine = {
        discount: o.discount,
        id: o.id,
        name: o.name,
        priceSubTotal: o.price_subtotal,
        priceUnit: o.price_unit,
        productUomQty: o.product_uom_qty
      };
      return trans;
    });
  }
}
