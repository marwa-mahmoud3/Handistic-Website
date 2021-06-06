import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userRequest } from '../Services/userRequest';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.css']
})
export class CreateShopComponent implements OnInit {

  constructor(private userRequest : userRequest) { }
  public ShowLink:boolean ;
  public ShowImage:boolean;
  public secondform:boolean;
  ngOnInit(): void {
  }
  ShowLinkData()
  {
    this.ShowLink =true;
    this.ShowImage =false;
  }
  ShowImageData()
  {
    this.ShowImage =true;
    this.ShowLink =false;
  }
  UserData(form :NgForm)
  {
    // this.userRequest.inserRequest(from.value).subscribe(data.any)
  }
}
