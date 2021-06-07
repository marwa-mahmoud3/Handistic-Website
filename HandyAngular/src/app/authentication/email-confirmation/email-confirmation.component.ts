import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { ConfirmEmail } from 'src/app/Models/ConfirmEmail';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {

  constructor(private userservice:UserService) { }
  ngOnInit(): void {

  }
  public emailConfirmed :boolean;
  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;
  OnSubmit(form : NgForm){
    this.userservice.confirmEmail(form.value).subscribe(
      Resbonse=>{
        this.showSuccess=true;
        this.showError = false;
    },error => {
      this.showError = true;
      this.errorMessage = error;
      this.showSuccess =false;
    })
}
}
