import { ShopService } from './../Services/shopService';
import { Router } from '@angular/router';
import { shops } from './../Models/shop';
import { NgForm } from '@angular/forms';
import { Category } from './../Models/Category';
import { UserService } from 'src/app/Services/user.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from '../Services/ProductsService';
import { Product } from '../Models/Product';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../Services/CategoryService';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  public Currentuser;
  constructor(private ShopService :ShopService,private router :Router,private userservice:UserService,
    private categoryservice:CategoryService,private productService: ProductsService,private http: HttpClient ,
    ) { }
  public username=null;
  public email=null;
  public user=null;
  public Currentshop =null;
  currentshop = new shops(localStorage.getItem('shopId'),'','',[]);
  
  ProductData : Product
  ngOnInit(): void {
    this.loadProducts();
    this.username = localStorage.getItem('username');
    this.ShopService.ShopByUserId(localStorage.getItem('userId')).subscribe((data) => {        
      this.Currentshop= data.shopName
    })
    this.userservice.getIdByUserName(this.username).subscribe((data:any)=>{
      this.user = data;
      this.email = this.user.email;
    });
    this.GetAllCategories();    
  }
products : Product[]= [];
productList : Product[] = [];

loadProducts() {
  this.productService.getAllProducts()
      .subscribe(
          (products: any[]) => {
              this.products = products;
              this.products.forEach(product => {
                if(Number(localStorage.getItem('shopId'))== product.shopId){
                  this.productList.push(product);
              }})
          },
      );
}

List =[]
index : number;
public product = new Product(Number(localStorage.getItem('shopId')),localStorage.getItem('username'),Date.now.toString(),'','',null,null,'','',null,null);
public success:boolean
SaveProduct(form : NgForm)
  {
    this.List= this.product.productImagePath.split('\\');
    this.index = this.product.productImagePath.split('\\').length
    this.product.productImagePath = "Resources/images/"+this.List[this.index-1];
    this.productService.createProduct(this.product).subscribe(
      (data:any)=>{
        form.reset();
        this.success =true;
        location.reload();
      },error => {
        this.success = false;
      })
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
  deleteProduct(id){
    this.productService.deleteById(id).subscribe();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(["/Wishlist"]);  
  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:44339/api/Upload', formData, {reportProgress: true, observe: 'events'})
    .subscribe()
       
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
