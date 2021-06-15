import { CookieService } from 'ngx-cookie-service';
import { ProductsService } from '../Services/ProductsService';
import { ProductWishlist } from './../Models/ProductWishlist';
import { ProductWishlistService } from './../Services/ProductWishlistService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { Product } from '../Models/Product';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private _productservices: ProductsService, private _productwishlistServices: ProductWishlistService, private userService: UserService, private router: Router) { }
  productwish: ProductWishlist[] = [];
  productwishList: ProductWishlist[] = [];
  products: Product[] = [];
  wishlistID:number;
  user: any;

  ngOnInit(): void {
    this.getAllUserProductWish();
  }
  getAllUserProductWish() {


    this.userService.getIdByUserName(localStorage.getItem('username')).subscribe(
      dataa => {
        this.user = dataa;
        this._productwishlistServices.GetWishlistByUserId(this.user.id).subscribe(
          data2 => {
            this.wishlistID=data2.id;
            this._productwishlistServices.getAllProductWishlists().subscribe((data: any) => {
              this.productwish = data;
              this.productwish.forEach(product => {
                if (product.wishlistID == data2.id) {
                  this.productwishList.push(product);
                }
              });

              this.productwishList.forEach(product => {
                this._productservices.getProductById(product.productId).subscribe((data: any) => {
                  this.products.push(data);
                });
              });
            });

          }
        )

      }
    );
  }

  ClearWishlist(){ 
      this._productwishlistServices.deleteByWishlistId(this.wishlistID).subscribe(); 
      window.location.reload();
  }
  
  RemoveProductFromWishlist(id){
      this._productwishlistServices.deleteByProductId(id).subscribe(); 
      window.location.reload();
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
