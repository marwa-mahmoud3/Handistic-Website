import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrls: ['./addcity.component.css']
})
export class AddcityComponent implements OnInit {

  constructor(private cityservice:CityService) { }

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
