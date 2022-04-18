import { Injectable } from '@angular/core';
import {StorageService} from './storage.service';
import {HttpClient} from '@angular/common/http';
import {ErrorsService} from './errors.service';
import {Product} from '../models/Product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = 'https://odoo.app.ngrok.io/app/get/products';

  constructor(private storage: StorageService,
              private http: HttpClient,
              private handler: ErrorsService) { }

  getAllProducts(){
    this.http.get(this.url)
      .subscribe(data=>{
        this.storage.productsListObservableData = this.productsParser(data);
        this.handler.noError();
      });
  }

  getProductsById(id: string){
    const params = {ids: id};
    this.http.get(this.url, {params})
      .subscribe(data=>{
        this.storage.productsListObservableData = this.productsParser(data);
        this.handler.noError();
      });
  }

  getProductsByName(name: string){
    const params = {name};
    this.http.get(this.url, {params})
      .subscribe(data=>{
        this.storage.productsListObservableData = this.productsParser(data);
        this.handler.noError();
      });
  }

  productsParser(data: any): Product[]{
    return data.products.map(p => {
      const product: Product = {
        defaultCode: p.default_code,
        displayName: p.display_name,
        id: p.id,
        name: p.name,
        qtyAvailable: p.qty_available,
        standardPrice: p.standard_price
      };
      return product;
    });
  }
}
