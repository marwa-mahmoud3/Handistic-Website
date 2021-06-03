import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmEmail } from '../Shared/ConfirmEmail';
import { LoginUsers } from '../Shared/Login';
import { ResetPassword } from '../Shared/ResetPassword';
import { Users } from '../Shared/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  url_Register='https://localhost:44339/api/Auth/Register?isAdmin=true';
  url_Login='https://localhost:44339/api/Auth/Login';
  url_confirm="https://localhost:44339/api/Auth/EmailConfrimation";
  url_reset='https://localhost:44339/api/Auth/ResetPassword';
  url_user='https://localhost:44339/api/Users';
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
  confirmEmail(confirmemail : ConfirmEmail)
  {
    return this.http.post(this.url_confirm,confirmemail);
  }
  resetpassword(reset : ResetPassword)
  {
    return this.http.put(this.url_reset,reset);
  }
  getUserByEmail(email): Observable<any> {
    return this.http.get(`${this.url_user}/${email}`);
  }
}
  