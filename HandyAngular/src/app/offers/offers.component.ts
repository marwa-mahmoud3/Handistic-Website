import { Component, OnInit } from '@angular/core';
import { Category } from '../Models/Category';
import { Product } from '../Models/Product';
import { ProductWishlist } from '../Models/ProductWishlist';
import { CategoryService } from '../Services/CategoryService';
import { ProductsService } from '../Services/ProductsService';
import { UserService } from 'src/app/Services/user.service';
import { CartService } from '../Services/CartService';
import { ProductWishlistService } from '../Services/ProductWishlistService';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  filterTerm: string;
  categories: Category[] = [];
  CategoryList : Category[] = [];
 
  CountProducts :number []=[]
  user:any;
  constructor(private productWishlistService:ProductWishlistService,private UserService: UserService, private productservices: ProductsService,private categoryService : CategoryService,private CartService:CartService) {
  }

  ngOnInit(): void {
    this.loadCategoriesWithDiscount();
    this.getProductsPerPage(1); 
    this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
      data =>{
        this.user=data}))
  }

  /**** WishList*******/
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
 

  
  loadCategoriesWithDiscount()
  {
    this.categoryService.getCategories().subscribe((data:any)=>{
      this.categories = data;
      this.categories.forEach(category => {
          this.productservices.getOfferdProductsByCategory(category.id).subscribe((data=>{
          if(data>0){
            console.log(this.currentCategoryId);
            if(this.currentCategoryId==0){
              this.setCrrentCategoryId(category);
            }
            this.CategoryList.push(category); 
            this.CountProducts.push(data);
          }
          }));
       });
    });
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

  AddItemToCart(productId:number){
  this.CartService.addItemToCart(this.user.id,productId,null).subscribe();
  }
  getPriceAfterDiscount(prouct:Product){
   let res=prouct.unitPrice;
   res-=prouct.unitPrice*(prouct.discount/100.0);
   return Math.ceil(res);
  }
  
//pagination 
hasProducts:boolean = false;
errorMsg: string;
productsPerPage: Product[];
pageSize: number = 3;
productsCount= 0;
currentPageNumber: number = 1;
numberOfPages: number; // categoriesCount / pageSize
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
this.productservices.getOfferdProductsByCategory(category.id).subscribe((data=>{
this.productsCount=data;
this.numberOfPages=Math.ceil(this.productsCount / this.pageSize);
}))
}
getProductsPerPage(currentPageNumber: number) {
  this.productservices.getOfferedByCategoryPaging(this.currentCategoryId,this.pageSize, currentPageNumber).subscribe(
    data => {
      console.log(data);
      this.productsPerPage = data
      console.log(data);
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
}