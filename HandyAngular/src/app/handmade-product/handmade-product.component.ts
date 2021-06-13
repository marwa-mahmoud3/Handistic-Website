import { logging } from 'protractor';
import { ProductsService } from './../Services/products.service';
import { CategoryService } from './../Services/CategoryService';

import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/Product';
import { Category } from '../Models/Category';
import { ProductsCount } from '../Models/ProductsCount';

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
  CountProducts :ProductsCount[] =[]
  constructor( private productservices: ProductsService,private categoryService : CategoryService) {
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
  AllCounts
  loadCategories()
  {
    this.categoryService.getCategories().subscribe((data:any)=>{
      this.categories = data;
      this.categories.forEach(category => {
          this.CategoryList.push(category); 
          this.productservices.getCountOfProducts(category.id).subscribe(
            (count =>{
                this.CountProducts.push(count);
            })        
          )
       });
    });
  }
  getProductsByCategory(id)
  {
    this.productList = []
    this.productservices.GetProductsByCategoryId(id).subscribe(
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
