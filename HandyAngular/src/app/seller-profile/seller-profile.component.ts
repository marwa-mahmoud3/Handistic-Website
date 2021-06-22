import { UserService } from 'src/app/Services/user.service';
import { Users } from './../Models/Users';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {

  constructor(private UserService:UserService) { }
  users =null
  user =null
 ngOnInit(): void {
   this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
     data =>{
       this.user=data
       this.users= new Users(localStorage.getItem('username'),this.user.email,this.user.city,this.user.password,'')
     }
   ))
 }
}
