import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../Models/Category';
import { Product } from '../Models/Product';
import { CategoryService } from '../Services/CategoryService';
import { ProductsService } from '../Services/ProductsService';
import { CartService } from '../Services/CartService';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {

  user:any;
  product:Product;
  category:Category;
  productId:number;
  constructor(private productservices: ProductsService,
              private route:ActivatedRoute,
              private categoryservice:CategoryService,
              private CartService:CartService,
              private UserService:UserService) { }

  ngOnInit(): void {
    this.productId=+ this.route.snapshot.paramMap.get('id');
    this.getProduct(this.route.snapshot.paramMap.get('id'));
    this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
      data =>{
        this.user=data}))
  }
  
  getProduct(id): void {
    this.productservices.getProductById(id)
      .subscribe(
        data => {
          this.product=data;
          this.categoryservice.getCategoryByID(this.product.categoryId).subscribe((data=>{
            this.category=data;
         }));
        })
        
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44339/${serverPath}`;
  }
  AddItemToCart(productId:number){
    this.CartService.addItemToCart(this.user.id,productId,null).subscribe();
    location.reload();
    }
  
  }