import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../api/products.service';
import { QuotationService } from '../api/quotation.service';
import { StorageService } from '../api/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  listas: any [] = [];
  constructor(private storage: StorageService, private products: ProductsService) { 
    storage.productsListObservable.subscribe(data =>{
     this.listas = data
    })
    products.getAllProducts()
  }
  
  ngOnInit() {

  }

  buscar(event){
    console.log(event);
  }


}
