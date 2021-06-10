import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class sellerService {

  constructor(private http: HttpClient) { }
  url='https://localhost:44339/api/Sellers';
  ngOnInit() {          
  }
  CheckSellerORNot(userId)
  {
    return this.http.get(`${this.url}/UserId?userId=${userId}`);
  }
}
