import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authservices/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  adminRef?: any;

  constructor(public router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.adminRef = JSON.parse(localStorage.getItem('user'));
    console.log(this.adminRef);

  }
}
