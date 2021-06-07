import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryServices } from 'src/app/Services/CategoryServices';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  constructor(private categoryservice:CategoryServices , private route:ActivatedRoute) { }
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
