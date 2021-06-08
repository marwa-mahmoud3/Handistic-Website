import { Category } from './../Models/Category';
import { CategoryService } from './../Services/CategoryService';
import { UserService } from 'src/app/Services/user.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products.service';
import { Product } from '../Models/Product';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {

  constructor(private userservice :UserService,private categoryservice:CategoryService,private productservice: ProductsService) { }
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
  public product = new Product('','',null,null,'','',null);
  SaveProduct()
  {
    console.log(this.product)
      this.productservice.createProduct(this.product).subscribe()
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
}
