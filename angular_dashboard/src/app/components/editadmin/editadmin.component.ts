import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminsService } from 'src/app/services/adminsservices/admins.service';

@Component({
  selector: 'app-editadmin',
  templateUrl: './editadmin.component.html',
  styleUrls: ['./editadmin.component.css']
})
export class EditadminComponent implements OnInit {

  public editForm: FormGroup;
  adminRef: any

  constructor(
    public adminService: AdminsService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      name: [''],
      phone: [''],
      password:[''],
    })
  }

  ngOnInit(): void {
    const id = this.act.snapshot.paramMap.get('id');

    this.adminService.getAdminDoc(id).subscribe(res => {
      this.adminRef = res;
      this.editForm = this.formBuilder.group({
        name: [this.adminRef.name],
        email: [this.adminRef.email],
        phone: [this.adminRef.phone],
        password: [this.adminRef.password],
      })      
    })
  }

  onSubmit() {
    const id = this.act.snapshot.paramMap.get('id');
    
    this.adminService.updateAdmin(this.editForm.value, id);
    this.router.navigate(['list-users']);
  };

}
