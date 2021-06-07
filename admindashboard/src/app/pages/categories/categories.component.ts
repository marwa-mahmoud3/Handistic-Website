import { Router } from '@angular/router';
import { Category } from './../../Models/Category';
import { Component, OnInit } from '@angular/core';
import { CategoryServices } from 'src/app/Services/CategoryServices';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoryservice:CategoryServices , private router:Router) { }
  categories:Category[]=[];
  CategoryList:Category[]=[];
  CurrentCity =null;
  ngOnInit(): void {
    this.GetAllCategories();
  }
  GetAllCategories()
  {
    this.categoryservice.getCategories().subscribe((data:any)=>{
      this.categories = data;
      this.categories.forEach(city => {
          this.CategoryList.push(city);
      });
    });
  }
  deleteCategory(id): void {
    this.categoryservice.deleteCategory(id).subscribe()
  }
  

}
