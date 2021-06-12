import { CategoryService } from './../Services/CategoryService';
import { Router } from '@angular/router';
import { ShopService } from '../Services/shopService';
import { shop } from './../Models/shop';
import { city } from './../Models/city';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RequestModel } from '../Models/RequestModel';
import { CityService } from '../Services/CityService';
import { UserService } from '../Services/user.service';
import { userRequest } from '../Services/userRequest';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {Output, EventEmitter } from '@angular/core';
import { Category } from '../Models/Category';
@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.css']
})
export class CreateShopComponent implements OnInit {
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private CategoryService:CategoryService,private userservic : UserService,private userRequestService : userRequest,private router: Router,
  private shopservice: ShopService ,private cityservice:CityService,private http: HttpClient) { }
  public ShowLink:boolean =true;
  public ShowImage:boolean;
  public secondform:boolean;
  public firstform:boolean=true;
  public Currentuser;
  public request = new RequestModel('','','','','','','','','');
  user = new RequestModel(localStorage.getItem('userId'),'','','','','','','','');
  currentShop =new shop(localStorage.getItem('userId'),'',[])
  ngOnInit(): void {
    this.getId();
    this.GetAllCities();  
  }    
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
  public showSuccess:boolean;
  public showError :boolean;
  public errorMessage :string;
  List =[]
  List1 = []
  List2 =[]
  index : number;
  index1 : number;
  index2 : number;
  UserData(form :NgForm)
  {
    this.List= this.request.idCardImage.split('\\');
    this.index = this.request.idCardImage.split('\\').length
    this.request.idCardImage = "Resources/images/"+this.List[this.index-1];
   
    this.List1= this.request.personWithCardImage.split('\\');
    this.index1 = this.request.personWithCardImage.split('\\').length
    this.request.personWithCardImage = "Resources/images/"+this.List1[this.index-1];
    
    this.List2= this.request.productWithCardImage.split('\\');
    this.index2 = this.request.productWithCardImage.split('\\').length
    this.request.productWithCardImage = "Resources/images/"+this.List2[this.index-1];

    this.userRequestService.inserRequest(this.request).subscribe( Resbonse=>{
      this.showSuccess=true;
      this.showError = false;
      this.secondform =true;
      this.firstform=false;
  },error => {
    this.showError = true;
    this.errorMessage = error;
    this.showSuccess =false;
  })
   
  }
  getId()
  {
    this.userservic.getIdByUserName(localStorage.getItem('username')).subscribe(result => {
      this.Currentuser = result;
      localStorage.setItem('userId',this.Currentuser.id)
      this.request.userId = this.Currentuser.id;
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
  public Success :boolean
  public Error :boolean
  CreateShop(form : NgForm)
  {
     this.shopservice.CreateShop(form.value).subscribe(Resbonse=>{
      this.Success=true;
      this.Error = false;
      this.router.navigate(['/profile'])
  },error => {
    this.Error = true;
    this.errorMessage = error;
    this.showSuccess =false;
  })
    
  }
 
   public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:44339/api/Upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
}
}
