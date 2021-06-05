
import { CategoryService } from './../Services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products.service';
import { Product } from '../Shared/Product';
import { Category } from '../Shared/Category';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-handmade-product',
  templateUrl: './handmade-product.component.html',
  styleUrls: ['./handmade-product.component.css']
})
export class HandmadeProductComponent implements OnInit {

  products: Product[] = [];
  productList: Product[] = [];
  item: number;
  count: number;
  categories: Category[] = []
  categoryList: Category[] = [];
  categoryLength: number[] = [];
  temp: Product[] = [];

  // searchKey:string;
  // searchedProducts:Product[];
  // errorMsg:string;
  // foundProducts:boolean = false;

  constructor(private HomeService: ProductsService, private productservices: ProductsService, private CategoryService: CategoryService,private _route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadProducts();
     this.loadCategories();
    // this._route.paramMap.subscribe(
    //   params=>{
    //     this.searchKey = params.get('searchkeyword');
    //     this.getSearchedProducts();
     // }
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
  loadCategories() {
    this.CategoryService.getAllCategories()
      .subscribe(
        (categories: any[]) => {
          this.categories = categories;
          this.categories.forEach(category => {
            this.categoryList.push(category);
          })
        },
      );

  }

  getProductsByCategory(id) {
    this.productservices.getCategoryProducts(id).subscribe(
      (categoryProducts: any[]) => {
        this.temp = categoryProducts;
        this.categoryLength.push(this.temp.length);
        this.count=categoryProducts.length;
        console.log(this.count);
      
       // console.log(this.temp.length + " " + categoryProducts.length);
      //  this.count=categoryProducts.length;
      })
  }

  // getSearchedProducts(){
  //   this._productService.getProductsBySearch(this.searchKey).subscribe(
  //     data=>{
  //       this.searchedProducts = data;
  //       if(data.length != 0)
  //         this.foundProducts = true;
  //       else
  //         this.foundProducts = false;
  //     },
  //     error=>{
  //       this.errorMsg = error;
  //     }
  //   )
  // }



}