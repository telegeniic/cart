import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  saveInfo(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getInfo(key: string){
    return JSON.parse(localStorage.getItem(key));
  }

  clearAllData(){
    localStorage.clear();
  }

  deleteInfo(key: string){
    localStorage.removeItem(key);
  }
}
