import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  constructor(private categoryservice:CategoryService) { }

  ngOnInit(): void {
  }
  public showSuccess: boolean =false ;
  public showError: boolean;
  public errorMessage: string;
  OnSubmit(form : NgForm){
    this.categoryservice.addCategory(form.value).subscribe((data:any)=>{
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
