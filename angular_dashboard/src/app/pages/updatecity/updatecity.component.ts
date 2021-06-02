import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-updatecity',
  templateUrl: './updatecity.component.html',
  styleUrls: ['./updatecity.component.css']
})
export class UpdatecityComponent implements OnInit {

  constructor(private cityservice:CityService , private router:Router  , private route:ActivatedRoute) { }
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
