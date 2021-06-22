import { UserService } from 'src/app/Services/user.service';
import { Users } from './../Models/Users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

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
