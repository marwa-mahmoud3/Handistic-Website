import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryservice:CategoryService , private router:Router) { }
  categories:category[]=[];
  CategoryList:category[]=[];
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
