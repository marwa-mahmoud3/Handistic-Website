import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-before-login',
  templateUrl: './header-before-login.component.html',
  styleUrls: ['./header-before-login.component.css']
})
export class HeaderBeforeLoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goToSearchPage(searchKey){
    this.router.navigate([`searchResult/${searchKey}`])
  }
}
