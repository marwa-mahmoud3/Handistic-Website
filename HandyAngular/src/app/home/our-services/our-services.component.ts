import { Users } from './../../Models/Users';
import { UserService } from 'src/app/Services/user.service';
import { SellerReview } from './../../Models/SellerReview';
import { SellerReviewService } from './../../Services/SellerReview';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {

  constructor(private SellerReviewService:SellerReviewService,private UserService : UserService) { }
  SellerReviewList : SellerReview[]=[]
  usersList:{[id:number]:string}={};
  rating:boolean[]=[]
  map = new Map<string, number>();
  ngOnInit(): void {
    this.SellerReviewService.getAll().subscribe((data:any)=>{
      data.forEach(element => {
        this.SellerReviewService.averagerRating(element.sellerId).subscribe(avg=>{
           if(Math.ceil(Number(avg)) == 5 && this.map[element.sellerId] != element.rating)
           { 
             this.SellerReviewList.push(element)
             this.map[element.sellerId] =element.rating; 
           }
        })   
        this.UserService.getUserNameByUserId(element.sellerId).subscribe(
          item=>{
            if(this.usersList[element.id]!= item.userName )
            {
              this.usersList[element.id]=item.userName
            }           
          }
        )
      });
  }) 
 }
}
