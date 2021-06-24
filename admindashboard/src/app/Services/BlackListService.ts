import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../Models/City';
import { Seller } from '../Models/Seller';

@Injectable({
  providedIn: 'root'
})
export class BlackListService {

  constructor(private http: HttpClient) { }
  url_BlackList='https://localhost:44339/api/BlackList';
  ngOnInit() {          
  }
  getAll():Observable<any>{
    return this.http.get(`${this.url_BlackList}/GetAll`);
  }
  UnBlockUser(userId:string):Observable<any>{
    return this.http.delete(`${this.url_BlackList}/${userId}`);
  }
  getByUserId(userId:string):Observable<any>{
    let url=`https://localhost:44339/api/BlackList/GetBlockedUser/${userId}`;
    return this.http.get(url);
  }
  AddSellerToBlackList(seller :Seller):Observable<any>{
    let url=`https://localhost:44339/api/BlackList/AddSeller`
    return this.http.post(url,seller);
  }
  getById(id)
  {
    return this.http.get(`${this.url_BlackList}/GetById?id=${id}`);
  }
  unBlock(id):Observable<any>
  {
    let url=`https://localhost:44339/api/BlackList?id=${id}`
    return this.http.delete(url);
  }
}