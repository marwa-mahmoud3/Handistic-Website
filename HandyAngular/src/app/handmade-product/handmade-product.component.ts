import { UserService } from './../Services/user.service';
import { ProductWishlist } from './../Models/ProductWishlist';


import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products.service';
import { Product } from '../Models/Product';
import { Category } from '../Models/Category';
import { CategoryService } from '../Services/CategoryService';
import { ProductWishlistService } from '../Services/ProductWishlistService';
import { Users } from '../Models/Users';
import { ThrowStmt } from '@angular/compiler';

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
  productList: Product []=[];
  item :number;
  productWishlist : ProductWishlist;
  user : any;
  wishlistid:number
  constructor(private HomeService: ProductsService , private productservices: ProductsService
    ,private categoryService : CategoryService ,private productWishlistService : ProductWishlistService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productservices.getAllProducts()
        .subscribe(
            (products: any[]) => {
                this.products = products;
                this.products.forEach(product => {
                    this.productList.push(product);
                })
            },
        );
  }

  AddToWishList(id){
    this.userService.getIdByUserName(localStorage.getItem('username')).subscribe(
      data => {
        this.user = data;
        this.productWishlistService.GetWishlistByUserId(this.user.id).subscribe(
          data=>{
            console.log(id+"id");
            console.log(data.id+"wishID");
            this.productWishlist.wishlistID=data.id;
            this.productWishlist.productId=id;

          }
        )

    console.log(this.productWishlist)
       this.productWishlistService.createProductWishlist(this.productWishlist).subscribe(
        
          )
      
      }
    )
  }


  loadCategories()
  {
    this.categoryService.getCategories().subscribe((data:any)=>{
      this.categories = data;
      this.categories.forEach(city => {
          this.CategoryList.push(city);
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
}
