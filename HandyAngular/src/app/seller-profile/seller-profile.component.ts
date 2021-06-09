
import { shop } from './../Models/shop';
import { NgForm } from '@angular/forms';
import { Category } from './../Models/Category';
import { CategoryService } from './../Services/CategoryService';
import { UserService } from 'src/app/Services/user.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from '../Services/products.service';
import { Product } from '../Models/Product';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ShopService } from '../Services/shopService';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {

  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  public Currentuser;
  constructor(private userservice :UserService,private categoryservice:CategoryService,private productService: ProductsService,private http: HttpClient , private shopService :ShopService) { }
  public username=null;
  public email=null;
  public user=null;

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.userservice.getIdByUserName(this.username).subscribe((data:any)=>{
      this.user = data;
      this.email = this.user.email;
    });
    this.GetAllCategories();    
  }
products : Product[]= [];
productList : Product[] = [];
public ProductData = new Product( null,'','',null ,null,'','',null);

loadProducts() {
  this.productService.getAllProducts()
      .subscribe(
          (products: any[]) => {
              this.products = products;
              this.products.forEach(product => {
                  this.productList.push(product);
              })
          },
      );
}

getShopByUserId(){
  var result =this.shopService.getShopByUserId(localStorage.getItem("userId"));
  console.log(result);
}


SaveProduct()
  {
    console.log(this.ProductData)
      this.productService.createProduct(this.ProductData).subscribe();
  }

  
  categories: Category[]=[];
  CategoryList:Category[]=[];
  GetAllCategories()
  {
    this.categoryservice.getCategories().subscribe((data:any)=>{
      this.categories = data;
      this.categories.forEach(city => {
          this.CategoryList.push(city);
      });
    });
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:44339/api/Upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
      
}
}
