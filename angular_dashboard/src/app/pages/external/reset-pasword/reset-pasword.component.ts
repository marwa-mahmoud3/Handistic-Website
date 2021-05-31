import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authservices/auth.service';

@Component({
  selector: 'app-reset-pasword',
  templateUrl: './reset-pasword.component.html',
  styleUrls: ['./reset-pasword.component.css']
})
export class ResetPaswordComponent implements OnInit {

  constructor( public Auth: AuthService) { }

  ngOnInit(): void {
    
  }

}
