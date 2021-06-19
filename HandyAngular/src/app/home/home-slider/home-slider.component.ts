import { Category } from './../../Models/Category';
import { CategoryService } from './../../Services/CategoryService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css']
})
export class HomeSliderComponent implements OnInit {

  constructor(private CategoryService :CategoryService) { }
  CategoryList :Category[]=[]
  ngOnInit(): void {
    this.CategoryService.getCategories().subscribe((data:any)=>{
      console.log(data)

      data.forEach(city => {
          this.CategoryList.push(city);
      });
    });
  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44339/${serverPath}`;
  }

}
