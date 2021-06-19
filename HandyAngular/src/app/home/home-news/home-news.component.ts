import { ProductWishlistService } from './../../Services/ProductWishlistService';
import { UserService } from 'src/app/Services/user.service';
import { CartService } from './../../Services/CartService';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { ProductsService } from 'src/app/Services/ProductsService';
import { ProductWishlist } from 'src/app/Models/ProductWishlist';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.css']
})
export class HomeNewsComponent implements OnInit {
  products : Product[]=[]
  productList : Product[]=[]
  user:any;
    constructor(private _productsService:ProductsService,private CartService:CartService,
      private UserService:UserService,private productWishlistService:ProductWishlistService) { }
    ngOnInit(): void {
      this.getBest();
      this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
        data =>{
          this.user=data}))
    }
  getBest(){
    this._productsService.GetTopSales().subscribe(
      (products: any[]) => {
          this.products = products;
          this.products.forEach(product => {
              this.productList.push(product);
          })
      },
  );
}
public createImgPath = (serverPath: string) => {
  return `https://localhost:44339/${serverPath}`;
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
