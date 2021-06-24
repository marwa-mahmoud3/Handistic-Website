import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { Users } from '../../Models/Users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userModel=new Users('','','','','');
  constructor(private userservice:UserService,private router: Router) { }
  fieldTextType: boolean;
  repeatFieldTextType: boolean;
  
  ngOnInit(): void {
    this.reserform();
  }
  reserform(form? : NgForm){
    if(form !=null)
      form.reset();
    this.userModel= {
      userName:'',
      email:'',
      city:'',
      password : '',
      confirmPassword :''
    }
  }
  public showError: boolean;
  public errorMessage: string;
  OnSubmit(form : NgForm){
    this.userservice.registerUser(this.userModel).subscribe((data:any)=>{
      if(data.Succeeded == true)
      this.reserform(form);
      this.router.navigate(["/EmailConfirmation"]);
      window.scrollTo(0, 0); 
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
