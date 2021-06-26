import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { ProductWishlist } from 'src/app/Models/ProductWishlist';
import { ProductsService } from 'src/app/Services/ProductsService';
import { ProductWishlistService } from 'src/app/Services/ProductWishlistService';
import { AddReviewService } from 'src/app/Services/ReviewService';
import { UserService } from 'src/app/Services/user.service';
import { CartService } from './../../Services/CartService';
@Component({
  selector: 'app-customize-product',
  templateUrl: './customize-product.component.html',
  styleUrls: ['./customize-product.component.css']
})
export class CustomizeProductComponent implements OnInit {

  products : Product[]=[]
  productList : Product[]=[]
  user:any;
    constructor(private _productsService:ProductsService,private CartService:CartService,
      private UserService:UserService,private productWishlistService:ProductWishlistService,
      private reviewService:AddReviewService) { }
    ngOnInit(): void {
      this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
        data =>{
          this.user=data}))
        this._productsService.getCustomizedProducts(localStorage.getItem('userId')).subscribe(data2=>{
          this.productList=data2;
          if(this.productList.length >8)
              {
                this.flag=true
              }
              if(this.productList.length >4)
              {
                this.flag1=true
              }
          data2.forEach(p => {
            this.reviewService.averagerRating(p.id).subscribe(
              num=>
              {
                if(this.Reviews[p.id]!= Number(num))
                {
                  this.Reviews[p.id]= Number(num)
                }
            }) 
          })
          
        })      
    }
    flag:boolean
    flag1 :boolean
    Reviews:{[id:number]:number}={};

public createImgPath = (serverPath: string) => {
  return `https://localhost:44339/${serverPath}`;
}

getPriceAfterDiscount(prouct:Product){
  let res=prouct.unitPrice;
  res-=prouct.unitPrice*(prouct.discount/100.0);
  return Math.ceil(res);
 }
 hasDiscount(product:Product){
  return product.discount>0;
}
AddItemToCart(productId:number){
  this.CartService.addItemToCart(this.user.id,productId,null).subscribe();
  location.reload();
  }
  public productWishlist;
  AddToWishList(id){
    this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe(
      data => {
        this.user = data;
        this.productWishlistService.GetWishlistByUserId(this.user.id).subscribe(
          product=>{
            this.productWishlist = new ProductWishlist(id,product.id);
            this.productWishlistService.CreateProductWishlist(this.productWishlist).subscribe( 
            );
          }
        )  
      }
    )
  }
}