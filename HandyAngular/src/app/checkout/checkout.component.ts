import { Product } from './../Models/Product';
import { NotificationService } from './../Services/notification.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OrderService } from './../Services/OrderService';
import { BillingDetailsService } from './../Services/BillingDetailsService';
import { BillingDetails } from './../Models/BillingDetails';
import { Component, OnInit } from '@angular/core';
import { CartItem } from '../Models/CartItem';
import { UserService } from 'src/app/Services/user.service';
import { CartService } from '../Services/CartService';
import { ProductsService } from '../Services/ProductsService';
import { Notification } from '../Models/Notification';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private UserService:UserService, private CartService:CartService,
             private ProductsService:ProductsService,private BillingDetailsservice: BillingDetailsService,
             private Orderservice : OrderService,private router :Router,
             private notificationService:NotificationService,private Productservice :ProductsService) { }
  
  user:any;
  cartItemList:CartItem[]=[];
  productCartList:Product[]=[];
  firstform :boolean=true;
  SecondForm:boolean;
  public Billing 
 ngOnInit(): void {
   this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
     data =>{
       this.user=data
       this.Billing= new BillingDetails('','','',this.user.city,null,'',this.user.email,this.user.id)
       this.CartService.getUserCartItems(this.user.id).subscribe((
        data=>{
          this.cartItemList=data;
          data.forEach(item => {
            this.ProductsService.getProductById(item.productId).subscribe((data:any) =>{
              this.productCartList.push(data);
            })
          });
        }
      ))
     }
   )) 
 }
 
  ClearCart(){ 
    this.CartService.crearCart(this.user.id).subscribe();
    window.location.reload();
  }

  getProductName(idx){
    return this.productCartList[idx].productName;
  }
  getProductPathImg(idx){
    return this.productCartList[idx].productImagePath;
  }

  getTotalPrice(){
  let total=0;
  this.cartItemList.forEach(e=>{
    total+=e.totalPrice;
  })
  return total;
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:44339/${serverPath}`;
  }
  public response: {dbPath: ''};
  public uploadFinished = (event) => {
    this.response = event;
  }
  Billings 
  Order
  notify 
  seller 
  notificationBody: string ="Ordered Your Product"
  count :number =0
  AddBilling(form :NgForm)
  {
    this.Orderservice.CreateOrder(localStorage.getItem('userId'),this.getTotalPrice()).subscribe((u=>{
      this.cartItemList.forEach(item => {    
        this.Orderservice.AddOrderItem(item.productId,item.cartId).subscribe()       
      }) 
      this.BillingDetailsservice.inserBillingDetails(form.value).subscribe((data=>{
        this.Billings = data 
           
        for(var i=1;i<=1;i++)
        {
          this.Orderservice.GetAllOrderItems(this.Billings.id).subscribe((ordeItem:any)=>{   
          ordeItem.forEach(element => {
            this.Productservice.getProductById(element.productID).subscribe((pro:any) =>{
              this.UserService.getIdByUserName(pro.userName).subscribe((u=>{
                this.seller = u
                this.notify = new Notification(this.notificationBody,this.Billings.id,this.seller.id,localStorage.getItem('userId'))
            
                  this.notificationService.createNotification(this.notify).subscribe();
              
              }))
            })
          })
          this.CartService.crearCart(localStorage.getItem('userId')).subscribe()                   
          })
        }
  })) 
  }))
  }
  goToStore()
  {
    this.router.navigate(["/profile"])
  }
}
