import { Product } from './../Shared/Product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
baseURL= 'https://localhost:44339/api/Product';

getAllProducts() {
  return this.http.get(this.baseURL);
}


getProductById(id): Observable<any> {
return this.http.get(`${this.baseURL}/Products/${id}`);
}

createProduct(data): Observable<any> {
return this.http.post(`${this.baseURL}/Products`, data);
}

update(id, data): Observable<any> {
return this.http.put(`${this.baseURL}/Products/${id}`, data);
}

delete(id): Observable<any> {
return this.http.delete(`${this.baseURL}/Products/${id}`);
}
deleteAll(): Observable<any> {
return this.http.delete(`${this.baseURL}/Products`);
}

searchByName(name): Observable<any> {
return this.http.get(`${this.baseURL}/Products?name=${name}`);
}

getCategoryProducts(id): Observable<any>{
  return this.http.get(`${this.baseURL}/ProductList/${id}`);
}
}