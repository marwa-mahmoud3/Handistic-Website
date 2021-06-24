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
  productPriceAfterDiscount:{[id:number]:number}={};

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

   this.ProductsService.getAllProducts().subscribe((data:any)=>{
     data.forEach(e => {
      let res=e.unitPrice;
      res-=e.unitPrice*(e.discount/100.0);
      this.productPriceAfterDiscount[e.id]=Math.ceil(res);
     });
   });
 }

 ClearCart(){ 
  this.CartService.crearCart(this.user.id).subscribe();
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(["/Cart"]);
}

increaseItemQuantity(productId:number){
  this.CartService.increaseCartItemQuantity(this.user.id,productId,null).subscribe();
   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(["/Cart"]);
}

decreaseItemQuantity(productId:number,quantity:number){
  if(quantity>1){
  this.CartService.decreaseCartItemQuantity(this.user.id,productId,null).subscribe();}

  else {this.CartService.deleteItemFromCart(this.user.id,productId).subscribe();}
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(["/Cart"]);
}
RemoveItemFromCart(productId:number){
  this.CartService.deleteItemFromCart(this.user.id,productId).subscribe();
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate(["/Cart"]);
}
getProductName(idx){
  return this.productCartList[idx].productName;
}
getProductPathImg(idx){
  return this.productCartList[idx].productImagePath;
}
GoToCheckOut(){
  if(this.cartItemList.length>0)
    {
      this.router.navigate(["/Checkout"])
      window.scrollTo(0,0)
    }
}
getTotalPriceForCart(){
 let total=0;
 this.cartItemList.forEach(e=>{
   total+=this.productPriceAfterDiscount[e.productId]*e.quantity
 })
 return total;
}
getTotalPriceForProduct(productId:number,quantity:number){
  return this.productPriceAfterDiscount[productId]*quantity;
}
public createImgPath = (serverPath: string) => {
  return `https://localhost:44339/${serverPath}`;
}

}