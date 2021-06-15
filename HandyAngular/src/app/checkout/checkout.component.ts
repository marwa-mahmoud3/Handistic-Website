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

  constructor(private UserService:UserService, private CartService:CartService,private ProductsService:ProductsService) { }
  
  user:any;
  cartItemList:CartItem[]=[];
  productCartList:Product[]=[];
  firstform :boolean=true;
  SecondForm:boolean;
  
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
 
 goToPayment()
 {
   this.firstform =false;
   this.SecondForm =true;
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
public credit :boolean =true;
public paypal :boolean ;
public banking :boolean ;
Credit()
{
   this.credit =true;
   this.paypal =false;
   this.banking= false;
}
Paypal()
{
   this.credit =false;
   this.paypal =true;
   this.banking= false;
}
Banking()
{
   this.credit =false;
   this.paypal =false;
   this.banking= true;
}
}
