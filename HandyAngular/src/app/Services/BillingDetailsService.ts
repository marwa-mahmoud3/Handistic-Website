import { BillingDetails } from './../Models/BillingDetails';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillingDetailsService {

  constructor(private http: HttpClient) { }
  url_billing='https://localhost:44339/api/BillingDetails';
  ngOnInit() {          
  }
 
  inserBillingDetails(billing : BillingDetails)
  {
    return this.http.post(this.url_billing,billing);
  }
}
