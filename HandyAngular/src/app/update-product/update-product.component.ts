
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../Models/Category';
import { Product } from '../Models/Product';
import { CategoryService } from '../Services/CategoryService';
import { ProductsService } from '../Services/ProductsService';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  constructor(private productservices: ProductsService,
              private route:ActivatedRoute,
              private categoryservice:CategoryService,
              private http: HttpClient ) { }

  prodctId:number;
  ngOnInit(): void {
    this.prodctId=+ this.route.snapshot.paramMap.get('id');
    this.getCategory(this.prodctId)
    this.getProduct(this.route.snapshot.paramMap.get('id'));
    this.GetAllCategories();    
  }

  currentProduct:Product;

  public showSuccess: boolean =false ;
  public showError: boolean;
  public errorMessage: string;
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  updateProduct(): void {
    this.productservices.update(this.prodctId,this.currentProduct)
      .subscribe((data:any)=>{
        this.showSuccess=true;
        this.showError = false;
      },error => {
        this.showError = true;
        this.errorMessage = error;
        this.showSuccess=false;
      })
  }

  getProduct(id): void {
    this.productservices.getProductById(id)
      .subscribe(
        product => {
          this.currentProduct=product;
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

List =[]
index : number;
public success:boolean
ProductData : Product
  OnSubmit(form : NgForm){
      this.List= this.currentProduct.productImagePath.split('\\');
      this.index = this.currentProduct.productImagePath.split('\\').length
      this.currentProduct.productImagePath = "Resources/images/"+this.List[this.index-1];
      this.productservices.update(this.prodctId,this.currentProduct)
        .subscribe((data:any)=>{
          this.showSuccess=true;
          this.showError = false;
        },error => {
          this.showError = true;
          this.errorMessage = error;
          this.showSuccess=false;
        })
    }
    category:Category
    getCategory(id): void {
      this.categoryservice.getCategoryByID(id).subscribe((data=>{
          this.category=data;
      }));        
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