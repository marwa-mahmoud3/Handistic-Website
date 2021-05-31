import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authservices/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private router: Router, public AuthenticationService: AuthService,public formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]],
    })      
  }
  
  ngOnInit(): void {
  }

  onSubmit() {
    var email=this.loginForm.get('email').value;
    var pass=this.loginForm.get('password').value;
     this.AuthenticationService.SignIn(email,pass);
   }


}
