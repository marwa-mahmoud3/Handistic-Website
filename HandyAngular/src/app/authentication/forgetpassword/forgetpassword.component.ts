import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { confirmEmail } from '../../Shared/ConfirmEmail';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  confirmemail=new confirmEmail('');
  constructor(private userservice:UserService,private router: Router) { }
  
  ngOnInit(): void {
    this.reserform();
  }
  reserform(form? : NgForm){
    if(form !=null)
      form.reset();
    this.confirmemail= {
      email:'',
    }
  }
  public showError: boolean;
  public errorMessage: string;
  OnSubmit(form : NgForm){
    this.userservice.confirmEmail(form.value).subscribe((data:any)=>{
      if(data.error == null)
        this.reserform(form);
    },error => {
      this.showError = true;
      this.errorMessage = error;
    })
    if(!this.errorMessage)
    {
      this.router.navigate(["/ResetPassword"]);
    }
  }


}
