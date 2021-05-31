import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminsService } from 'src/app/services/adminsservices/admins.service';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {

  public adminForm: FormGroup;

  constructor(
    public adminService:  AdminsService,
    public formBuilder: FormBuilder,
  ) { 
    this.adminForm = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [],
      password: [''],
      imgurl:[''],
    })      
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.adminService.createAdmin(this.adminForm.value);
   };
   onFileSelected($event)
   {

   }
}

