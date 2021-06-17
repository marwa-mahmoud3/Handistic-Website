import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OrderService } from './../Services/OrderService';
import { BillingDetailsService } from './../Services/BillingDetailsService';
import { BillingDetails } from './../Models/BillingDetails';
import { Component, OnInit } from '@angular/core';
import { CartItem } from '../Models/CartItem';
import { Product } from '../Models/Product';
import { UserService } from 'src/app/Services/user.service';
import { CartService } from '../Services/CartService';
import { ProductsService } from '../Services/ProductsService';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private UserService:UserService, private CartService:CartService,
             private ProductsService:ProductsService,private BillingDetailsservice: BillingDetailsService,
             private Orderservice : OrderService,private router :Router) { }
  
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
AddBilling(form :NgForm)
{
  this.Orderservice.CreateOrder(localStorage.getItem('userId'),this.getTotalPrice()).subscribe((data=>{
    this.cartItemList.forEach(item => {
      this.Orderservice.AddOrderItem(item.productId,item.cartId).subscribe()
    })
    this.BillingDetailsservice.inserBillingDetails(form.value)
    .subscribe((data=>{
      this.CartService.crearCart(localStorage.getItem('userId')).subscribe();
    }))   
  })
  )
}

goToStore()
{
  this.router.navigate(["/profile"])
}
}
