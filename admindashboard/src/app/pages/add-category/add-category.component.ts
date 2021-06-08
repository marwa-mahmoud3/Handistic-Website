import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryServices } from 'src/app/Services/CategoryServices';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private categoryservice:CategoryServices) { }

  ngOnInit(): void {
  }
  public showSuccess: boolean =false ;
  public showError: boolean;
  public errorMessage: string;
  OnSubmit(form : NgForm){
    this.categoryservice.addCategory(form.value).subscribe((data:any)=>{
      this.showSuccess=true;
      this.showError = false;
    },error => {
      this.showError = true;
      this.errorMessage = error;
      this.showSuccess=false;
    })
  }

}
