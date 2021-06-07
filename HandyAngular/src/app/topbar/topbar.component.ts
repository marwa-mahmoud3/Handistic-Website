import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  public islogin:boolean;
  constructor(private apiservice:ApiService) { }

  ngOnInit(): void {
  }
  isLogin()
  {
    if(this.apiservice.isLoggedIn())
      console.log(true);
    else 
    console.log(false);
  }
}
