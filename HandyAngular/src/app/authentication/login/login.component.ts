import { ShopService } from './../../Services/shopService';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {  ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmEmail } from 'src/app/Models/ConfirmEmail';
import { UserService } from '../../Services/user.service';
import { LoginUsers } from '../../Models/Login';
  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {
    loginuser=new LoginUsers('','');
    isLoginError : boolean =false;
    fieldTextType: boolean;
    repeatFieldTextType: boolean; 
    constructor(private userservice:UserService,private router: Router ,private route:ActivatedRoute,private shopService:ShopService) { }
    email= new ConfirmEmail('');
    ngOnInit() {
      this.reserform();
      
    }
    reserform(form? : NgForm){
      if(form !=null)
        form.reset();
      this.loginuser= {
        email:'',
        password : ''
      }
    }
    public emailConfirmed :boolean;
    public showSuccess: boolean;
    public showError: boolean;
    public errorMessage: string;
    OnSubmit(form : NgForm){
    this.userservice.loginUser(this.loginuser).subscribe((data:any)=>{
      if(data.Succeeded == true)
        this.reserform(form);
        this.userservice.getUserByEmail(this.loginuser.email).subscribe((user=>{
          this.router.navigate(['/profile'])
          localStorage.setItem('username',user.userName)
            localStorage.setItem('userId',user.id)
            this.shopService.ShopByUserId(user.id).subscribe(
              (data) => {
                localStorage.setItem('shopId',data.id) 
              })
          }))    
    },error => {
      this.showError = true;
      this.errorMessage = error;
    })
  }
  
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }
}