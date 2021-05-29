import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUsers } from '../Shared/Login';
import { confirmEmail } from '../Shared/ConfirmEmail';
import { Users } from '../Shared/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  url_Register='https://localhost:44339/api/Auth/Register?isAdmin=true';
  url_Login='https://localhost:44339/api/Auth/Login';
  url_reset='https://localhost:44339/api/Auth/EmailConfrimation';
  ngOnInit() {          
  }
  registerUser(user : Users)
  {
    return this.http.post(this.url_Register,user);
  }
  loginUser(loginuser : LoginUsers)
  {
    return this.http.post(this.url_Login,loginuser);
  }
  confirmEmail(confirmemail : confirmEmail)
  {
    return this.http.post(this.url_reset,confirmemail);
  }
}
  