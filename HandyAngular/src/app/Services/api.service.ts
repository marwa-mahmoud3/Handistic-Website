import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
 @Injectable({
     providedIn: 'root'
  })
  export class ApiService {
  loginStatus = new BehaviorSubject<boolean>(this.hasToken());
  
  constructor(private cookieService: CookieService, private router: Router) { }


  logout() {
    this.loginStatus.next(false);
    this.cookieService.deleteAll();
    this.router.navigate(['/Home']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  private hasToken(): boolean {
    return this.cookieService.check('currentUser');
  }
}
    
    