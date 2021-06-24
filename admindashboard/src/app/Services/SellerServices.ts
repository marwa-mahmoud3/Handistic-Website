import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seller } from '../Models/Seller';

@Injectable({
  providedIn: 'root'
})
export class SellertServices {

  constructor(private http: HttpClient) { }
  url_request='https://localhost:44339/api/Sellers';
  url_userName='https://localhost:44339/api/Users/GetNameByUserId';

  ngOnInit() {          
  }
  addseller(seller : Seller)
  {
    return this.http.post(this.url_request,seller);
  } 
  getSellers(){ 
    return this.http.get(this.url_request)
  }
  deleteSeller(UserId,UserName): Observable<any> {
    return this.http.delete(`${this.url_request}/UserId?userId=${UserId}&UserName=${UserName}`);
  }
  updateSeller(id,seller): Observable<any> {
    return this.http.put(`${this.url_request}/${id}`,seller);
  }
  getSellerByID(id): Observable<any> {
    return this.http.get(`${this.url_request}/${id}`);
  }
  getIdByUserName(userName) { 
    return this.http.get(`${this.url_userName}/${userName}`);
  }

}