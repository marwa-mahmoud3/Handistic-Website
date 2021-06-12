import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class shopServices {

  constructor(private http: HttpClient) { }
  url = 'https://localhost:44339/api/Shops'
  baseurl='https://localhost:44339/api/CityShops/CityShop';
  ngOnInit() {          
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
}