import { ProductWishlist } from './../Models/ProductWishlist';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductWishlistService {
  constructor(private http: HttpClient) { }
  url = 'https://localhost:44339/api/productWishlist'
  baseUrl = 'https://localhost:44339/api/Wishlist/GetId'

  ngOnInit() {          
  }
  CreateProductWishlist(ProductWishlist :ProductWishlist)
  {
    return this.http.post(this.url,ProductWishlist);
  }
  getAllProductWishlists() {​​​
    return this.http.get(this.url);
  }​​​
  getProductWishlistById(id): Observable<any> {​​​
    return this.http.get(`${​​​this.url}​​​/${​​​id}​​​`);
  }​​​
  createProductWishlist(data:ProductWishlist): Observable<any> {​​​
    return this.http.post(​​​this.url, data);
  }​​​
  update(id, data): Observable<any> {​​​
    return this.http.put(`${​​​this.url}​​​/${​​​id}​​​`, data);
  }​​​
  delete(id): Observable<any> {​​​
    return this.http.delete(`${​​​this.url}​​​/${​​​id}​​​`);
  }​​​

  GetWishlistByUserId(userid:string): Observable<any>{
    console.log(userid);
    console.log(`${​​​this.baseUrl}/${userid}​​​`);
    let urll=`${​​​this.baseUrl}/${userid}`;
     return this.http.get(urll);
   // return this.http.get(`${​​​this.baseUrl}/${userid}​​​`);
  }

  ProductWishlistByUserId(UserId): Observable<any> {​​​
    let urll=`${this.url}/UserId?userId=${UserId}`;
    return this.http.get(urll);
   // return this.http.get(`https://localhost:44339/api/Shops/UserId?userId=a73d7dc1-3eac-42b2-a38c-dac75d558486`);
    // return this.http.get(`${this.url}/UserId?userId=${UserId}​​​`);
  }
}
