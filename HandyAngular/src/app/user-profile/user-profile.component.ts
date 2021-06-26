import { sellerService } from './../Services/sellerService';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { Users } from './../Models/Users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private UserService:UserService,private route:ActivatedRoute) { }
   users =null
   user =null
   answer
   flag:boolean = false
  ngOnInit(): void {
    if(localStorage.getItem('shopId')!=null)
    { 
      this.flag =true
    }   
    this.UserService.getIdByUserName(this.route.snapshot.paramMap.get('userName')).subscribe((
      data =>{
        this.user=data
        this.users= new Users(this.route.snapshot.paramMap.get('userName'),this.user.email,this.user.city,this.user.password,'')
      }
    ))
  }
 
}
