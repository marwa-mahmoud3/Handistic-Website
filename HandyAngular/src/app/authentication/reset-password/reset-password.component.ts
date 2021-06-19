import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { ConfirmEmail } from 'src/app/Models/ConfirmEmail';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  confirmemail=new ConfirmEmail('');
  constructor(private userservice:UserService,private router: Router) { }
  fieldTextType: boolean;
  repeatFieldTextType: boolean;
  ngOnInit(): void {
  }

  public showError: boolean;
  public errorMessage: string;
  OnSubmit(form : NgForm){
    this.userservice.resetpassword(form.value).subscribe((data:any)=>{
      if(!data.error)
        this.router.navigate(["/Login"]);
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
