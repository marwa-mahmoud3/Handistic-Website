import { sellerService } from './../Services/sellerService';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../Models/Users';
import { ApiService } from '../Services/api.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-header-after-login',
  templateUrl: './header-after-login.component.html',
  styleUrls: ['./header-after-login.component.css']
})
export class HeaderAfterLoginComponent implements OnInit {
  public User :Users;
  public CurrentUser =null;
  constructor(private apiservice : ApiService ,private route:ActivatedRoute,private userservice:UserService,
    private router: Router ,private sellerService : sellerService,private UserService :UserService) { }
  ngOnInit(): void {
    this.getUser(this.route.snapshot.paramMap.get('email'));
    this.CurrentUser = localStorage.getItem('username')
  }
  logout(){
    this.apiservice.logout();
    localStorage.clear()
  }
  user =null;
  userid :string;
  getUser(email): void {
    this.userservice.getUserByEmail(email)
      .subscribe(
        user => {
          this.User = user;
          localStorage.setItem('username',this.User.userName)
        })
  }
  answer ;
  goToProfile()
  {
    this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe(
      data => {
        this.user = data;
        this.sellerService.CheckSellerORNot(this.user.id).subscribe(
          data=>{
            this.answer =data;
            if(this.answer)
              this.router.navigate(["/SellerProfile"]);
            else 
              this.router.navigate(["/UserProfile"]);
          });
      }
    )
     
  }
}