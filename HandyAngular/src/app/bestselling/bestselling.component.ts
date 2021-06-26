import { AddReviewService } from './../Services/ReviewService';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { CartService } from './../Services/CartService';
import { CategoryService } from './../Services/CategoryService';
import { UserService } from 'src/app/Services/user.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { Category } from '../Models/Category';
import { ProductWishlist } from '../Models/ProductWishlist';
import { ProductsService } from '../Services/ProductsService';
import { ProductWishlistService } from '../Services/ProductWishlistService';
@Component({
  selector: 'app-bestselling',
  templateUrl: './bestselling.component.html',
  styleUrls: ['./bestselling.component.css']
})
export class BestsellingComponent implements OnInit {
products : Product[]=[]
productList : Product[]=[]
filterTerm: string;
categories: Category[] = [];
CategoryList : Category[] = [];
CountProducts :number []=[]
user:any;
IsLogin:boolean
constructor(private productWishlistService:ProductWishlistService,private _productsService :ProductsService
  ,private UserService: UserService, private productservices: ProductsService,
  private router:Router,private CartService:CartService,private reviewService:AddReviewService) {
}

ngOnInit(): void {
  if(localStorage.getItem('username')!=null)
  {
    this.IsLogin=true
  }
  this.getProductsPerPage(1); 
  this._productsService.GetTopSales().subscribe(data=>{
    this.productsCount=data.length;
this.numberOfPages=Math.ceil(this.productsCount / this.pageSize);  })
  this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
    data =>{
      this.user=data}))
}

/** WishList***/
public productWishlist;
AddToWishList(id){
  this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe(
    data => {
      this.user = data;
      this.productWishlistService.GetWishlistByUserId(this.user.id).subscribe(
        product=>{
          this.productWishlist = new ProductWishlist(id,product.id);
          this.productWishlistService.CreateProductWishlist(this.productWishlist).subscribe((data=>{
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([`/bestSelleing/`])
          }) 
          );
        }
      )  
    }
  )
}


public createImgPath = (serverPath: string) => {
  return `https://localhost:44339/${serverPath}`;
}
public response: {dbPath: ''};

AddItemToCart(productId:number){
this.CartService.addItemToCart(this.user.id,productId,null).subscribe();
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate([`/bestSelleing/`]);
}
getPriceAfterDiscount(prouct:Product){
 let res=prouct.unitPrice;
 res-=prouct.unitPrice*(prouct.discount/100.0);
 return Math.ceil(res);
}

hasProducts:boolean = false;
errorMsg: string;
productsPerPage: Product[];
pageSize: number = 8;
productsCount= 0;
currentPageNumber: number = 1;
numberOfPages: number; 
selectedCategoryId: number;
currentCategoryId:number=0
currentCategory:Category;


counter(i: number) {
return new Array(i);
}
setCrrentCategoryId(category){
this.currentCategoryId=category.id;
this.currentCategory=category;
this.getSelectedPage(1);

}
Reviews:{[id:number]:number}={};
getProductsPerPage(currentPageNumber: number) {
  this.productservices.getBestSellingPagination(this.pageSize, currentPageNumber).subscribe(
    data => {
      this.productsPerPage = data
      data.forEach(element => {
        this.reviewService.averagerRating(element.id).subscribe(
          num=>
          {
            if(this.Reviews[element.id]!= Number(num))
            {
              this.Reviews[element.id]= Number(num)
            }
          })
        }) 
      this.currentPageNumber = currentPageNumber;
      if(data.length != 0)
        this.hasProducts = true;
      else
        this.hasProducts = false;
  
    },
    error => {
      this.errorMsg = error;
    }
  )
  }
  

getSelectedPage(currentPageNumber: number) {
  this.getProductsPerPage(currentPageNumber);
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

hasDiscount(product:Product){
  return product.discount>0;
}
}