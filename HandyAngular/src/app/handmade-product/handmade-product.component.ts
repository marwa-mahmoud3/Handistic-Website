import { Router } from '@angular/router';
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
  CountProducts :ProductsCount[] =[]
  user:any;
  constructor(private productWishlistService:ProductWishlistService,private router :Router,
    private UserService:UserService, private productservices: ProductsService,private categoryService : CategoryService,private CartService:CartService) {
  }

  ngOnInit(): void {
    this.getProductsPerPage(1); 
    this.setCrrentCategoryId(this.currentCategoryId)
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
            this.productWishlistService.CreateProductWishlist(this.productWishlist).subscribe( 
            );
          }
        )  
      }
    )
  }
 
  CurrentCategory = new Category(1,"Clothes",'')
  loadCategories()
  {    
    this.CountProducts=[]
    this.categoryService.getCategories().subscribe((data:any)=>{
      data.forEach(category => {
          this.CategoryList.push(category); 
          this.productservices.getCountOfProducts(category.id).subscribe(
            (item =>{
                this.CountProducts.push(item);
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
  // location.reload();
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
  currentCategoryId:number=1;
  currentCategory:Category;
  

  
setCrrentCategoryId(categoryId){
  this.currentCategoryId=categoryId;
  this.getSelectedPage(1);
  this.productservices.getCountOfProducts(categoryId).subscribe((data=>{
  this.productsCount=data;
 this.numberOfPages=Math.ceil(this.productsCount / this.pageSize);

  }))
  this.categoryService.getCategoryByID(categoryId).subscribe((data=>{
    this.CurrentCategory=data
  }))
}
  getProductsPerPage(currentPageNumber: number) {
    this.productservices.getProductsByCategoryPaging(this.currentCategoryId,this.pageSize, currentPageNumber).subscribe(
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
  hasDiscount(product:Product){
    return product.discount>0;
  }
  getPriceAfterDiscount(prouct:Product){
    let res=prouct.unitPrice;
    res-=prouct.unitPrice*(prouct.discount/100.0);
    return Math.ceil(res);
   }
}