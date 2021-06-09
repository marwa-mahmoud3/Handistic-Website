import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< Updated upstream
=======
import { Observable } from 'rxjs';
>>>>>>> Stashed changes
import { RequestModel } from '../Models/RequestModel';
import { shop } from '../Models/shop';


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }
<<<<<<< Updated upstream
  url='https://localhost:44339/api/CityShops/CityShop';
=======
  url = 'https://localhost:44339/api/Shops'
  baseurl='https://localhost:44339/api/CityShops/CityShop';
>>>>>>> Stashed changes
  ngOnInit() {          
  }
  CreateShop(shop : shop )
  {
    return this.http.post(this.baseurl,shop);
  }
  
  getAllShops() {
    return this.http.get(this.url);
  }


  getShoptById(id): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  createShop(data): Observable<any> {
    return this.http.post(`${this.url}`, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  getShopByUserId(id): Observable<any> {
    return this.http.get(`${this.url}/UserShop/${id}`);
  }
}