import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from 'src/app/Models/ResetPassword';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  constructor(private userservice:UserService,private router: Router) { }
  currentuser=null;
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