import { Component, OnInit } from '@angular/core';
import { Category } from '../Models/Category';
import { Product } from '../Models/Product';
import { ProductsCount } from '../Models/ProductsCount';
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
  CategoryList : Category[] = [];
  products: Product [] = [];
  item :number;
  CountProducts :ProductsCount []=[]
  user:any;
  productsWithDiscount:Product[]=[];
  constructor(private productWishlistService:ProductWishlistService,private UserService: UserService, private productservices: ProductsService,private categoryService : CategoryService,private CartService:CartService) {
  }

  ngOnInit(): void {
    this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
      data =>{
        this.user=data}))
    this.loadCategories();
    this.getAllProductsWithDiscount();
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
 

  loadCategories()
  {
    this.categoryService.getCategories().subscribe((data:any)=>{
      data.forEach(category => {
          this.CategoryList.push(category); 
          this.productservices.getOfferdProductsByCategory(category.id).subscribe((data=>{
            this.CountProducts.push(data);
          }))     
       });
    });
  }


  getAllProductsWithDiscount(){
    this.productservices.getProductsWithDiscount().subscribe((data=>{
      this.productsWithDiscount=data;
    }))
  }
  getProductsByCategory(id)
  {
    this.productsWithDiscount = []
    this.productservices.GetProductsByCategoryId(id).subscribe(
      (data) => {
        this.products=data;
          this.products.forEach(product => {
            if(product.discount>0)
              this.productsWithDiscount.push(product);
          })
      },
  );
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
  location.reload();
  }
  getPriceAfterDiscount(prouct:Product){
   let res=prouct.unitPrice;
   res-=prouct.unitPrice*(prouct.discount/100.0);
   return Math.ceil(res);
  }
  

}
