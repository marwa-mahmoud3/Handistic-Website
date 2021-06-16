import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { CartService } from '../Services/CartService';
import { ProductsService } from '../Services/ProductsService';

import { CartItem } from '../Models/CartItem';
import { Product } from '../Models/Product';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private UserService:UserService,private router:Router, private CartService:CartService,private ProductsService:ProductsService) { }
  
  user:any;
  cartItemList:CartItem[]=[];
  productCartList:Product[]=[];
  

 ngOnInit(): void {
   this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
     data =>{
       this.user=data
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

increaseItemQuantity(productId:number){
  this.CartService.increaseCartItemQuantity(this.user.id,productId,null).subscribe();
  window.location.reload();
}

decreaseItemQuantity(productId:number,quantity:number){
  if(quantity>1){
  this.CartService.decreaseCartItemQuantity(this.user.id,productId,null).subscribe();}

  else {this.CartService.deleteItemFromCart(this.user.id,productId).subscribe();}
  window.location.reload();
}
RemoveItemFromCart(productId:number){
  this.CartService.deleteItemFromCart(this.user.id,productId).subscribe();
  window.location.reload();
}
getProductName(idx){
  return this.productCartList[idx].productName;
}
getProductPathImg(idx){
  return this.productCartList[idx].productImagePath;
}
GoToCheckOut(){
  if(this.cartItemList.length>0)
    this.router.navigate(["/Checkout"])
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
allproduct =null
onCreate()
{
  this.allproduct = {
    productImagePath :this.response.dbPath,
  }
}
public uploadFinished = (event) => {
  this.response = event;
}

}