import { logging } from 'protractor';
import { ProductsService } from './../Services/products.service';
import { CategoryService } from './../Services/CategoryService';
import { CartService } from '../Services/CartService';
import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/Product';
import { Category } from '../Models/Category';
import { ProductsCount } from '../Models/ProductsCount';
import { UserService } from 'src/app/Services/user.service';


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
  user:any;
  constructor(private UserService:UserService, private productservices: ProductsService,private categoryService : CategoryService,private CartService:CartService) {
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
      data =>{
        this.user=data}))
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

  AddItemToCart(productId:number){
  this.CartService.addItemToCart(this.user.id,productId,null).subscribe();
  }
}
