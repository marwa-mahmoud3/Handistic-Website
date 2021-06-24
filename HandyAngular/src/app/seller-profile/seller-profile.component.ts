import { CartService } from './../Services/CartService';
import { SellerReviewService } from './../Services/SellerReview';
import { SellerReview } from './../Models/SellerReview';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { Users } from './../Models/Users';
import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/Product';
import { Category } from '../Models/Category';
import { ProductsService } from '../Services/ProductsService';
import { ProductWishlistService } from '../Services/ProductWishlistService';
import { ProductWishlist } from '../Models/ProductWishlist';
@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {
  products : Product[]=[]
  productList : Product[]=[]
  filterTerm: string;
  categories: Category[] = [];
  CategoryList : Category[] = [];
  CountProducts :number []=[]
  user1:any;
  constructor(private productWishlistService:ProductWishlistService, private _productsService :ProductsService,private UserService:UserService,
   private route:ActivatedRoute,private SellerReviewService :SellerReviewService,
   private productservices: ProductsService, private router:Router,private CartService:CartService) { }
  users =null
  user =null
  list :number[]=[]
  list1:number[]=[]
  list2:number[]=[]
  list3:number[]=[]
  CountReviews :number
  ReviewsList : SellerReview[]=[]
  UsersList :string []=[]
 ngOnInit(): void {
  this.getProductsPerPage(1); 
  this._productsService.GetAllProductsBySellerName(this.route.snapshot.paramMap.get('userName')).subscribe(data=>{
  this.productsCount=data.length;
  this.numberOfPages=Math.ceil(this.productsCount / this.pageSize);  })
  this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
    data =>{
      this.user=data}))
   this.UserService.getIdByUserName(this.route.snapshot.paramMap.get('userName')).subscribe((
     data =>{
       this.user=data
       this.users= new Users(this.route.snapshot.paramMap.get('userName'),this.user.email,this.user.city,this.user.password,'')
       this.SellerReviewService.ShowReviews(this.user.id).subscribe((data:any)=>{
        data.forEach(element => {
       this.ReviewsList.push(element);
       this.UserService.getUserNameByUserId(element.userId).subscribe((u=>{
         this.UsersList.push(u.userName)
       }))   
    });
  })
  this.SellerReviewService.CountReviews(this.user.id).subscribe(
    (count =>{
      this.CountReviews = Number(count)
    })
  )
  this.SellerReviewService.averagerRating(this.user.id).subscribe((
   (avg=>{
     if(avg==6)
     {
       avg=5
     }
        for(var i=1;i<=Math.floor(Number(avg));i++)
        {
            this.list.push(i)
        }
        for(var j=1;j<=5-Math.floor(Number(avg));j++)
        {
            this.list1.push(j)
        }
   })
   ))
  }))
}
satrs(review:SellerReview)
{
    this.list2=[]
    this.list3=[]
    if(review.rating==6)
     {
      review.rating=5
     }
    for(var i=1;i<=review.rating;i++)
    {
       this.list2.push(i)
    }
    for(var i=1;i<=5-review.rating;i++)
    {
       this.list3.push(i)
    }
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
AddItemToCart(productId:number){
  this.CartService.addItemToCart(this.user.id,productId,null).subscribe();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([`/bestSelleing/`]);
  }
 public createImgPath = (serverPath: string) => {
  return `https://localhost:44339/${serverPath}`;
}
public response: {dbPath: ''};
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
getProductsPerPage(currentPageNumber: number) {
  this.productservices.getSellerProductsPagination(this.route.snapshot.paramMap.get('userName'), this.pageSize, currentPageNumber).subscribe(
    data => {
      this.productsPerPage = data
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