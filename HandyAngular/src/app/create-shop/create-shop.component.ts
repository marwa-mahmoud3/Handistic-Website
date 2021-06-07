import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { city } from '../Models/city';
import { RequestModel } from '../Models/RequestModel';
import { CategoryService } from '../Services/category.service';
import { CityService } from '../Services/CityService';
import { uploadcategory } from '../Services/uploadcategory';
import { UserService } from '../Services/user.service';
import { userRequest } from '../Services/userRequest';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.css']
})
export class CreateShopComponent implements OnInit {

  constructor(private userservic : UserService,private userRequestService : userRequest,private cityservice:CityService,
    private categoryservice:CategoryService ) { }
  public ShowLink:boolean =true;
  public ShowImage:boolean;
  public secondform:boolean=true;
  public firstform:boolean;
  public Currentuser;
  public request = new RequestModel('','','','','','','','','');
  ngOnInit(): void {
    this.getId();
    this.GetAllCities();
    this.GetAllCategories();
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

  cities:city[]=[];
  CityList:city[]=[];
  CurrentCity =null;
  GetAllCities()
  {
    this.cityservice.getCities().subscribe((data:any)=>{
      this.cities = data;
      this.cities.forEach(city => {
          this.CityList.push(city);
      });
    });
  }
  categories:uploadcategory[]=[];
  CategoryList:uploadcategory[]=[];
  GetAllCategories()
  {
    this.categoryservice.getCategories().subscribe((data:any)=>{
      this.categories = data;
      this.categories.forEach(city => {
          this.CategoryList.push(city);
      });
    });
  }
}
