import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmEmail } from '../Models/ConfirmEmail';
import { LoginUsers } from '../Models/Login';
import { ResetPassword } from '../Models/ResetPassword';
import { Users } from '../Models/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  url_Register='https://localhost:44339/api/Auth/Register?isAdmin=false';
  url_Login='https://localhost:44339/api/Auth/Login';
  url_confirm="https://localhost:44339/api/Auth/EmailConfrimation";
  url_reset='https://localhost:44339/api/Auth/ResetPassword';
  url_user='https://localhost:44339/api/Users/GetUserByEmail';
  url_userName='https://localhost:44339/api/Users/GetUserByUserName';
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
  getIdByUserName(userName) { 
    return this.http.get(`${this.url_userName}/${userName}`);
  }
  getUserNameByUserId(userId): Observable<any> { 
    let url=`https://localhost:44339/api/Users/GetNameByUserId/${userId}`;
    return this.http.get(url);
  }
  getAllUsers()
  {
    let url=`https://localhost:44339/api/Users/GetAllUsers`;
    return this.http.get(url);
  }
}
  