import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestModel } from '../Models/RequestModel';
import { shop } from '../Models/shop';


@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  constructor(private http: HttpClient) { }
  url='https://localhost:44339/api/CityShops/CityShop';
  ngOnInit() {          
  }
  CreateShop(shop : shop )
  {
    return this.http.post(this.url,shop);
  }
}