import { NotificationService } from './../Services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { BillingDetailsService } from './../Services/BillingDetailsService';
import { UserService } from './../Services/user.service';
import { AddReviewService } from './../Services/AddReviewService';
import { CategoryService } from './../Services/CategoryService';
import { Product } from './../Models/Product';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../Services/OrderService';
import { AddReview } from '../Models/AddReview';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  constructor(private UserService:UserService,private orderService:OrderService,private categoryservice:CategoryService,protected route :ActivatedRoute
    ,private AddReviewService :AddReviewService,private BillingDetailsService:BillingDetailsService,
    private NotifyService:NotificationService) { }
  ProductList : Product[]=[]
  CategoryList:string[]=[]
  product :Product
  Rating =1
  ProductsId :number[] =[]
  currentPoductId:number=0
  CountReviews :number[]=[]
  AverageRating:number[]=[]
  list :number[]=[]
  list1:number[]=[]
  CurrentBilling
  CurrentSeller
  ngOnInit(): void {
      this.BillingDetailsService.getBillingById(this.route.snapshot.paramMap.get('billingid')).subscribe((data=>{
      this.CurrentBilling= data
      this.NotifyService.GetByBillingId(this.route.snapshot.paramMap.get('billingid')).subscribe(
        (seller=>{
          this.CurrentSeller =seller
          this.UserService.getUserNameByUserId(this.CurrentSeller.sellerId).subscribe((u=>{
            this.CurrentSeller =u
            this.orderService.GetOrderItems(this.CurrentBilling.orderId,this.CurrentSeller.userName).subscribe(
              (data:any)=>{
                 data.forEach(element => {
                   this.ProductList.push(element);
                   this.ProductsId.push(element.id);
                   this.categoryservice.getCategoryByID(element.categoryId).subscribe((cat=>{cat
                     this.CategoryList.push(cat.name);
                   }))
                   this.AddReviewService.CountReviews(element.id).subscribe(
                     (count =>{
                       this.CountReviews.push(Number(count))
                     })
                   )
                   this.AddReviewService.averagerRating(element.id).subscribe((
                    (avg=>{
                      this.AverageRating.push(Math.floor(Number(avg)))
                    })
                   ))
                 });
              })
        })
      )
      
      }))
   
    }))
  }

  public ReviewObject 
 func(idx){
   this.ReviewObject =new AddReview(localStorage.getItem('userId'),'',this.ProductsId[idx],this.Rating)
 }
 satrs(index)
 {
    this.list=[]
    this.list1=[]
    for(var i=1;i<=this.AverageRating[index];i++)
    {
       this.list.push(i)
    }
    for(var i=1;i<=5-this.AverageRating[index];i++)
    {
       this.list1.push(i)
    }
 }
 
  AddReview :boolean ;
  AddStar()
  {
    this.AddReview= !this.AddReview;
    if(this.AddReview)
       this.Rating++;
    else 
      this.Rating--;
  }
  AddReview1 :boolean ;
  AddStar1()
  {
    this.AddReview1= !this.AddReview1;
    if(this.AddReview1)
        this.Rating++;
    else 
      this.Rating--;
  }
  AddReview2 :boolean ;
  AddStar2()
  {
    this.AddReview2= !this.AddReview2;
    if(this.AddReview2)
        this.Rating++;
    else 
      this.Rating--;
  }
  AddReview3 :boolean ;
  AddStar3()
  {
    this.AddReview3= !this.AddReview3;
    if(this.AddReview3)
        this.Rating++;
    else 
      this.Rating--;
  }
  AddReview4 :boolean ;
  AddStar4()
  {
    this.AddReview4= !this.AddReview4;
    if(this.AddReview4)
        this.Rating++;
    else 
      this.Rating--;
  }
  InsertReview(form )
  { 
    this.AddReviewService.AddReview(form.value).subscribe(
      (data=>{
        form.reset();
        this.AddReview = false;
        this.AddReview1 = false;
        this.AddReview2 = false;
        this.AddReview3 = false;
        this.AddReview4 = false;
       location.reload();
      })
    )

  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44339/${serverPath}`;
  }
  public response: {dbPath: ''};
  public uploadFinished = (event) => {
    this.response = event;
  } 
   
}
