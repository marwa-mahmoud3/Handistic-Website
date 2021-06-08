import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shop } from '../Models/shop';


@Injectable({
  providedIn: 'root'
})
export class userRequest {

  constructor(private http: HttpClient) { }
  url='https://localhost:44339/api/Shops';
  ngOnInit() {          
  }
  inserRequest(shop : shop )
  {
    return this.http.post(this.url,shop);
  }
}