import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shop } from '../Models/shop';
@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }
  url = 'https://localhost:44339/api/Shops'
  baseurl='https://localhost:44339/api/CityShops/CityShop';
  ngOnInit() {          
  }
  CreateShop(shop : shop )
  {
    return this.http.post(this.baseurl,shop);
  }
  getAllShops() {​​​
    return this.http.get(this.url);
  }​​​
  getShoptById(id): Observable<any> {​​​
    return this.http.get(`${​​​this.url}​​​/${​​​id}​​​`);
  }​​​
  createShop(data): Observable<any> {​​​
    return this.http.post(`${​​​this.url}​​​`, data);
  }​​​
  update(id, data): Observable<any> {​​​
    return this.http.put(`${​​​this.url}​​​/${​​​id}​​​`, data);
  }​​​
  delete(id): Observable<any> {​​​
    return this.http.delete(`${​​​this.url}​​​/${​​​id}​​​`);
  }​​​
  ShopByUserId(UserId): Observable<any> {​​​
    return this.http.get(`https://localhost:44339/api/Shops/UserId?userId=a73d7dc1-3eac-42b2-a38c-dac75d558486`);
    // return this.http.get(`${this.url}/UserId?userId=${UserId}​​​`);
  }
}​​​