import { Component, OnInit } from '@angular/core';
import { StorageService } from '../api/storage.service';
import { QuotationService } from '../api/quotation.service';
import { Quotation } from '../models/quotation.interface';
@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
})
export class Pagina2Page implements OnInit {
 cotisaciones: Quotation;
  constructor(
    private storage: StorageService,
    private quotationService: QuotationService,) { 
      this.storage.userQuotationsObservable.subscribe
        n=>{
        this.cotisaciones = n; 
         
        }
      
    
    }

  ngOnInit() {
   
  }
  
}
