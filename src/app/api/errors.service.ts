import {Injectable} from '@angular/core';
import {CustomError} from '../models/Error.interface';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private storage: StorageService) { }

  errorHandler(error: any){
    console.log(error, origin);
    let custom: CustomError;
    localStorage.removeItem('user');
    if(error.status === 0) {
      custom = {
        status: 500,
        message: 'server not working',
        origin: error.url
      };
    } else {
      custom = {
        status: error.status,
        message: error.error.error,
        origin: error.url
      };
    }
    this.storage.errorObservableData = custom;
  }

  noError(){
    this.storage.errorObservableData = {
      status: 200,
      message: '',
      origin: ''
    };
  }
}
