import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CityService } from 'src/app/services/city.service';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  constructor(private cityservice:CityService) { }

  ngOnInit(): void {
  }
  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;
  OnSubmit(form : NgForm){
    this.cityservice.addCity(form.value).subscribe((data:any)=>{
      if(data.Succeeded == true)
      this.showSuccess=true;
    },error => {
      this.showError = true;
      this.errorMessage = error;
    })
  }
}
