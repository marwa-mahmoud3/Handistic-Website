import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.css']
})
export class UpdatecategoryComponent implements OnInit {

  constructor(private categoryservice:CategoryService , private route:ActivatedRoute) { }
  currentCategory=null;
  ngOnInit(): void {
    this.getCategory(this.route.snapshot.paramMap.get('id'));
  }
  public showSuccess: boolean =false ;
  public showError: boolean;
  public errorMessage: string;
  updateCategory(): void {
    this.categoryservice.updateCategory(this.currentCategory.id, this.currentCategory)
      .subscribe((data:any)=>{
        this.showSuccess=true;
        this.showError = false;
      },error => {
        this.showError = true;
        this.errorMessage = error;
        this.showSuccess=false;
      })
  }
  getCategory(id): void {
    this.categoryservice.getCategoryByID(id)
      .subscribe(
        category => {
          this.currentCategory = category;
        })
  }

  OnSubmit(){
    this.updateCategory();
  }

}
