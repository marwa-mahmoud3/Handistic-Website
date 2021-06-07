import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CityServices } from 'src/app/Services/CityServices';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

  constructor(private cityservice:CityServices) { }

  ngOnInit(): void {
  }
  public showSuccess: boolean =false ;
  public showError: boolean;
  public errorMessage: string;
  OnSubmit(form : NgForm){
    this.cityservice.addCity(form.value).subscribe((data:any)=>{
      if(!data.error)
      this.showSuccess=true;
      this.showError = false;
    },error => {
      this.showError = true;
      this.errorMessage = error;
      this.showSuccess=false;
    })
  }
}
