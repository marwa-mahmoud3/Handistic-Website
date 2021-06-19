import { ActivatedRoute } from '@angular/router';
import { Users } from './../Models/Users';
import { ClientNotifyService } from './../Services/ClientNotifyService';
import { UserService } from 'src/app/Services/user.service';
import { Product } from './../Models/Product';
import { ProductsService } from './../Services/ProductsService';
import { OrderService } from './../Services/OrderService';
import { BillingDetailsService } from './../Services/BillingDetailsService';
import { NotificationService } from './../Services/notification.service';
import { Component, OnInit } from '@angular/core';
import { Notification } from '../Models/Notification';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private notify:NotificationService,private BillingDetailsService:BillingDetailsService,
    private orderService:OrderService,private ClientNotifyService:ClientNotifyService,
    private productservice :ProductsService,private userService:UserService,private route:ActivatedRoute) { }
  BillingItem
  ProductsList : Product[]=[]
  user 
  CurrentUser
  ngOnInit(): void {
    this.notify.getById(this.route.snapshot.paramMap.get('id')).subscribe((e=>{
        this.user = e
         this.userService.getUserNameByUserId(this.user.userId).subscribe((item=>{
           this.CurrentUser = item
         }))    
       }))
    this.notify.getNotificationById(localStorage.getItem('userId')).subscribe((data=>{
      this.BillingDetailsService.getBillingById(data[0].billingId).subscribe((element=>{
        this.BillingItem =element
        this.orderService.GetAllOrderItems(this.BillingItem.orderId).subscribe((items:any)=>{
          items.forEach(item => {
            this.productservice.getProductById(item.productID).subscribe((pro=>{
              this.ProductsList.push(pro);
            }))
          });
        })
      }))
    }))

  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44339/${serverPath}`;
  }

  ClientNotify
  client
  Body:string="Your Order Has been delivered , you can add a review on this order now."
  Delivered()
  {
    this.userService.getIdByUserName(this.CurrentUser.userName).subscribe((data=>{  
      this.client =data
    this.ClientNotify = new Notification(this.Body,this.BillingItem.id,localStorage.getItem('userId'),this.client.id)
    this.ClientNotifyService.createNotification(this.ClientNotify).subscribe()
    }))
  }
}
