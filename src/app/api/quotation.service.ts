import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Quotation} from '../models/Quotation';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  private token: string;
  private url = 'https://odoo.app.ngrok.io/'; //base url

  constructor(private storage: StorageService,
              private http: HttpClient) {
    this.storage.userObservable.subscribe( data => {
      this.token = 'Bearer '+data.token;
      });
  }

  getQuotations(){
    const direction = this.url+'app/get/cotizaciones';
    console.log(this.token);
    const headersObject = new HttpHeaders().set('Authorization', this.token);
    const httpOptions = {headers: headersObject};
    this.http.get<Quotation[]>(direction, httpOptions).subscribe(data => {
      this.storage.userQuotationsObservableData = data;
    }, error => {
      this.storage.loginErrorObservableData = {
        status: error.status,
        message: error.error.message
      };
    });

  }
}
