import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { city } from 'src/app/models/city';

import { CityService } from 'src/app/services/city.service';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  constructor(private cityservice:CityService , private router:Router) { }
  cities:city[]=[];
  CityList:city[]=[];
  CurrentCity =null;
  ngOnInit(): void {
    this.GetAllCities();
  }
  GetAllCities()
  {
    this.cityservice.getCities().subscribe((data:any)=>{
      this.cities = data;
      this.cities.forEach(city => {
          this.CityList.push(city);
      });
    });
  }
  deleteCity(id): void {
    this.cityservice.deleteCity(id).subscribe()
  }
  
  
}
