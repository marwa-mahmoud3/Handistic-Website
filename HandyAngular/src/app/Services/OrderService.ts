import { Cart } from './../Models/Cart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  url_Order='https://localhost:44339/api/Orders/CreateOrder';
  url_OrderItem='https://localhost:44339/api/Orders/AddItemInOrder';

  ngOnInit() {          
  }
 
  CreateOrder(userid , totalPrice)
  {
    let url=`${this.url_Order}/${userid}/${totalPrice}`;
    return this.http.post(url,userid,totalPrice);
  }
  AddOrderItem(productId, CartId)
  {
    let url=`${this.url_OrderItem}/${productId}/${CartId}`;
    return this.http.post(url,productId,CartId);
  }
  GetOrderItems(orderId,Sellername)
  {
    let url=`https://localhost:44339/api/Orders/GetOrderItems/${orderId}/${Sellername}`;
    return this.http.get(url);
  }

  GetAllOrderItems(orderId)
  {
    let url=`https://localhost:44339/api/Orders/GetAllOrderItems/${orderId}`;
    return this.http.get(url); 
  }
  GetAllOrders(orderId)
  {
    let url=`https://localhost:44339/api/Orders/GetAllOrders/${orderId}`;
    return this.http.get(url);
    
  }
}
