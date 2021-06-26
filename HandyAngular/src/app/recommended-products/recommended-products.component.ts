import { ProductWishlistService } from './../Services/ProductWishlistService';
import { CartService } from './../Services/CartService';
import { UserService } from './../Services/user.service';
import { AddReviewService } from './../Services/ReviewService';
import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/Product';
import { ProductWishlist } from '../Models/ProductWishlist';
import { ProductsService } from '../Services/ProductsService';

@Component({
  selector: 'app-recommended-products',
  templateUrl: './recommended-products.component.html',
  styleUrls: ['./recommended-products.component.css']
})
export class RecommendedProductsComponent implements OnInit {

  products : Product[]=[]
  productList : Product[]=[]
  user:any;
  IsLogin:boolean
    constructor(private _productsService:ProductsService,private CartService:CartService,
      private UserService:UserService,private productWishlistService:ProductWishlistService,
      private reviewService:AddReviewService) { }
    ngOnInit(): void {
      if(localStorage.getItem('username')!=null)
      {
        this.IsLogin=true
      }
      this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
        data =>{
          this.user=data}))
        this._productsService.getCustomizedProducts(localStorage.getItem('userId')).subscribe(data2=>{
          this.productList=data2;
          if(this.productList.length >12)
              {
                this.flag=true
              }
              if(this.productList.length >8)
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
