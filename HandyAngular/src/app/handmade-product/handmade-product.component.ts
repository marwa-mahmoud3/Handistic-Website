
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products.service';
import { Product } from '../Models/Product';
import { Category } from '../Models/Category';
import { CategoryService } from '../Services/CategoryService';

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
  constructor(private HomeService: ProductsService , private productservices: ProductsService,private categoryService : CategoryService) {
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
