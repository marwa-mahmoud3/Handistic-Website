import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TimeoutError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   //loggee:boolean=false;
  constructor( private router: Router) { }

  login(Token ){
    //  this.loggee=true;
    //  console.log(this.loggee)
    //  return this.loggee;

   localStorage.setItem('usertoken',Token);
  }
  logout(){
    // this.loggee=false;
    // return this.loggee;
    localStorage.removeItem('usertoken');
  }
    IsLogged():boolean{

      if(localStorage.getItem('usertoken'))
      {
        // this.router.navigateByUrl('/overview');
        return true;
      }
      else{
        return false;
      }
    }

}
