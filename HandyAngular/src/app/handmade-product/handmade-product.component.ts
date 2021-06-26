import { Router, ActivatedRoute } from '@angular/router';
import { ProductWishlistService } from './../Services/ProductWishlistService';
import { ProductsService } from '../Services/ProductsService';
import { CategoryService } from './../Services/CategoryService';
import { CartService } from '../Services/CartService';
import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/Product';
import { Category } from '../Models/Category';
import { ProductsCount } from '../Models/ProductsCount';
import { UserService } from 'src/app/Services/user.service';
import { ProductWishlist } from '../Models/ProductWishlist';
import { AddReviewService } from '../Services/ReviewService';


@Component({
  selector: 'app-handmade-product',
  templateUrl: './handmade-product.component.html',
  styleUrls: ['./handmade-product.component.css']
})
export class HandmadeProductComponent implements OnInit {
  filterTerm: string;
  categories: Category[] = [];
  CategoryList : Category[] = [];
  products: Product [] = [];
  item :number;
  user:any;
  CurrentCatgoryId
  constructor(private productWishlistService:ProductWishlistService,private reviewService:AddReviewService,private route:ActivatedRoute,private router :Router,
    private UserService:UserService, private productservices: ProductsService,private categoryService : CategoryService,private CartService:CartService) {
  }

  ngOnInit(): void {
    this.CurrentCatgoryId= this.route.snapshot.paramMap.get('id')
    this.getProductsPerPage(1); 
    this.getSelectedPage(1);
    
    this.productservices.getCountOfProducts(this.route.snapshot.paramMap.get('id')).subscribe((data=>{
    this.productsCount=data;
   this.numberOfPages=Math.ceil(this.productsCount / this.pageSize);
  
    }))
    this.categoryService.getCategoryByID(this.route.snapshot.paramMap.get('id')).subscribe((data=>{
      this.CurrentCategory=data
    }))
    this.loadCategories();
    this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
      data =>{
        this.user=data}))
  }
  public productWishlist;
  AddToWishList(id){
    this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe(
      data => {
        this.user = data;
        this.productWishlistService.GetWishlistByUserId(this.user.id).subscribe(
          product=>{
            this.productWishlist = new ProductWishlist(id,product.id);
            this.productWishlistService.CreateProductWishlist(this.productWishlist).subscribe( (data=>{
              location.reload()
            })           
            );
          }
        )  
      }
    )
  }
 
  CurrentCategory = new Category(1,"Accessories",'')
  CountProducts:{[id:number]:number}={};

  loadCategories()
  {    
    this.categoryService.getCategories().subscribe((data:any)=>{
      data.forEach(category => {
          this.CategoryList.push(category); 
          this.productservices.getCountOfProducts(category.id).subscribe(
            (item =>{
              if(this.CountProducts[category.id]!= Number(item))
              {
                this.CountProducts[category.id]= Number(item)
              }
            })        
          )
       });
    });
    
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:44339/${serverPath}`;
  }

  AddItemToCart(productId:number){
  this.CartService.addItemToCart(this.user.id,productId,null).subscribe();
  location.reload();
  }


  counter(i: number) {
    return new Array(i);
  }
  //pagination 
  hasProducts:boolean = false;
  errorMsg: string;
  productsPerPage: Product[];
  pageSize: number = 6;
  productsCount= 0
  currentPageNumber: number = 1;
  numberOfPages: number; 
  selectedCategoryId: number;
  currentCategory:Category;
  
Reviews:{[id:number]:number}={};
setCrrentCategoryId(categoryId){
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate([`/HandmadeProducts/${categoryId}`]);
}
  getProductsPerPage(currentPageNumber: number) {
    this.productservices.getProductsByCategoryPaging(this.CurrentCatgoryId,this.pageSize, currentPageNumber).subscribe(
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
            }
          )
        });
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
  hasDiscount(product:Product){
    return product.discount>0;
  }
  getPriceAfterDiscount(prouct:Product){
    let res=prouct.unitPrice;
    res-=prouct.unitPrice*(prouct.discount/100.0);
    return Math.ceil(res);
   }
}