import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { UserService } from '../../Services/user.service';
import { LoginUsers } from '../../Shared/Login';
  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {
    loginuser=new LoginUsers('','');
    isLoginError : boolean =false;
    constructor(private userservice:UserService,private router: Router) { }

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
    public showError: boolean;
    public errorMessage: string;
    OnSubmit(form : NgForm){
    this.userservice.loginUser(this.loginuser).subscribe((data:any)=>{
      if(data.Succeeded == true)
        this.reserform(form);
        this.router.navigate(["/Register"]);
    },error => {
      this.showError = true;
      this.errorMessage = error;
    })
  }
}