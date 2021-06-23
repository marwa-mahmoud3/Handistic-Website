import { SellerReviewService } from './../Services/SellerReview';
import { SellerReview } from './../Models/SellerReview';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { Users } from './../Models/Users';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {

  constructor(private UserService:UserService,private route:ActivatedRoute,private SellerReviewService :SellerReviewService) { }
  users =null
  user =null
  list :number[]=[]
  list1:number[]=[]
  list2:number[]=[]
  list3:number[]=[]
  CountReviews :number
  ReviewsList : SellerReview[]=[]
  UsersList :string []=[]
 ngOnInit(): void {
   this.UserService.getIdByUserName(this.route.snapshot.paramMap.get('userName')).subscribe((
     data =>{
       this.user=data
       this.users= new Users(this.route.snapshot.paramMap.get('userName'),this.user.email,this.user.city,this.user.password,'')
       this.SellerReviewService.ShowReviews(this.user.id).subscribe((data:any)=>{
        data.forEach(element => {
       this.ReviewsList.push(element);
       this.UserService.getUserNameByUserId(element.userId).subscribe((u=>{
         this.UsersList.push(u.userName)
       }))   
    });
  })

  this.SellerReviewService.CountReviews(this.user.id).subscribe(
    (count =>{
      this.CountReviews = Number(count)
    })
  )
  this.SellerReviewService.averagerRating(this.user.id).subscribe((
   (avg=>{
     if(avg==6)
     {
       avg=5
     }
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
  }))
}
satrs(review:SellerReview)
{
    this.list2=[]
    this.list3=[]
    if(review.rating==6)
     {
      review.rating=5
     }
    for(var i=1;i<=review.rating;i++)
    {
       this.list2.push(i)
    }
    for(var i=1;i<=5-review.rating;i++)
    {
       this.list3.push(i)
    }
 }
}
