import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityServices } from 'src/app/Services/CityServices';

@Component({
  selector: 'app-update-city',
  templateUrl: './update-city.component.html',
  styleUrls: ['./update-city.component.css']
})
export class UpdateCityComponent implements OnInit {

  constructor(private cityservice:CityServices , private router:Router  , private route:ActivatedRoute) { }
  currentCity=null;
  ngOnInit(): void {
    this.getCity(this.route.snapshot.paramMap.get('id'));
  }
  public showSuccess: boolean =false ;
  public showError: boolean;
  public errorMessage: string;
  updateCity(): void {
    this.cityservice.updateCity(this.currentCity.id, this.currentCity)
      .subscribe((data:any)=>{
        this.showSuccess=true;
        this.showError = false;
      },error => {
        this.showError = true;
        this.errorMessage = error;
        this.showSuccess=false;
      })
  }
  getCity(id): void {
    this.cityservice.getCityByID(id)
      .subscribe(
        city => {
          this.currentCity = city;
        })
  }

    OnSubmit(){
    this.updateCity();
  }

}
