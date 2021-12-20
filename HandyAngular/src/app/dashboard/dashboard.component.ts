import { ShopService } from './../Services/shopService';
import { ActivatedRoute, Router } from '@angular/router';
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
  CountProducts :number []=[]
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  public Currentuser;
  constructor(private ShopService :ShopService,private router :Router,private userservice:UserService,
    private route:ActivatedRoute, private categoryservice:CategoryService,private productService: ProductsService,private http: HttpClient ,
    private _productsService :ProductsService) { }
  public username=null;
  public email=null;
  public user=null;
  public Currentshop =null;
  currentshop = new shops(localStorage.getItem('shopId'),'','',[]);
  ProductData : Product
  ngOnInit(): void {
  this._productsService.GetAllProductsBySellerName(localStorage.getItem('username')).subscribe(data=>{
    console.log(data);
    console.log(localStorage.getItem('userName'));
  this.productsCount=data.length;
  this.numberOfPages=Math.ceil(this.productsCount / this.pageSize);  })
  this.getProductsPerPage(1); 
   // this.loadProducts();
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
    this.router.navigate(["/dashboard"]);  
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
  getPriceAfterDiscount(prouct:Product){
    let res=prouct.unitPrice;
    res-=prouct.unitPrice*(prouct.discount/100.0);
    return Math.ceil(res);
   }
hasProducts:boolean = false;
errorMsg: string;
productsPerPage: Product[];
pageSize: number = 3;
productsCount= 0;
currentPageNumber: number = 1;
numberOfPages: number; 
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
}
getProductsPerPage(currentPageNumber: number) {
  this.productService.getSellerProductsPagination(localStorage.getItem('username'), this.pageSize, currentPageNumber).subscribe(
    data => {
      console.log(data);
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
}