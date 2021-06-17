import { AddReview } from './../Models/AddReview';
import { AddReviewService } from './../Services/AddReviewService';
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
  list :number[]=[]
  list1:number[]=[]
  list2:number[]=[]
  list3:number[]=[]
  CountReviews :number[]=[]
  ReviewsList : AddReview[]=[]
  UsersList :string []=[]
  constructor(private productservices: ProductsService,
              private route:ActivatedRoute,
              private categoryservice:CategoryService,
              private CartService:CartService,
              private UserService:UserService,private AddReviewService :AddReviewService) { }

  ngOnInit(): void {
    this.productId=+ this.route.snapshot.paramMap.get('id');
    this.list=[]
    this.list1=[]
    
    this.AddReviewService.ShowReviews(this.productId).subscribe((data:any)=>{
      data.forEach(element => {
         this.ReviewsList.push(element);
         this.UserService.getUserNameByUserId(element.userId).subscribe((u=>{
           this.UsersList.push(u.userName)
         }))
      });
    })
    this.AddReviewService.CountReviews(this.productId).subscribe(
      (count =>{
        this.CountReviews.push(Number(count))
      })
    )
    this.AddReviewService.averagerRating(this.productId).subscribe((
     (avg=>{
       for(var i=1;i<=Math.floor(Number(avg));i++)
        {
          this.list.push(i)
        }
        for(var j=1;j<=5-Math.floor(Number(avg));j++)
        {
          this.list1.push(j)
        }
     })
     ))
    
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

 satrs(review:AddReview)
{
    this.list2=[]
    this.list3=[]
    for(var i=1;i<=review.rating;i++)
    {
       this.list2.push(i)
    }
    for(var i=1;i<=5-review.rating;i++)
    {
       this.list3.push(i)
    }
 }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44339/${serverPath}`;
  }
  AddItemToCart(productId:number){
    this.CartService.addItemToCart(this.user.id,productId,null).subscribe();
    location.reload();
    }
  
  }