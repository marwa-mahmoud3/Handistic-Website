import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/Models/City';
import { CityServices } from 'src/app/Services/CityServices';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  constructor(private cityservice: CityServices, private router:Router) { }
  cities:City[]=[];
  CityList:City[]=[];
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
