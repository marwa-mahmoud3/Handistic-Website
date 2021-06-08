import { city } from './../Models/city';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RequestModel } from '../Models/RequestModel';
import { CityService } from '../Services/CityService';
import { UserService } from '../Services/user.service';
import { userRequest } from '../Services/userRequest';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.css']
})
export class CreateShopComponent implements OnInit {

  constructor(private userservic : UserService,private userRequestService : userRequest,private cityservice:CityService,) { }
  public ShowLink:boolean =true;
  public ShowImage:boolean;
  public secondform:boolean;
  public firstform:boolean=true;
  public Currentuser;
  public request = new RequestModel('','','','','','','','','');

  ngOnInit(): void {
    this.getId();
    this.GetAllCities();    
  }
  name = 'Angular';
    
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
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
    this.userRequestService.inserRequest(this.request).subscribe(
      
    )
    this.secondform =true;
    this.firstform=false;
  }
  getId()
  {
    this.userservic.getIdByUserName(localStorage.getItem('username')).subscribe(result => {
      this.Currentuser = result;
      localStorage.setItem('userId',this.Currentuser.id)
      this.request.rquestId = this.Currentuser.id;
    })
  }
  city =[]
  cities:city[]=[];
  CityList:city[]=[];
  Selected :city[]=[];
  GetAllCities()
  {
    this.cityservice.getCities().subscribe((data:any)=>{
      this.cities = data;
      this.cities.forEach(city => {
          this.CityList.push(city);
      });
      this.city = this.CityList;
    });
  }
}
