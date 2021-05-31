import { Component, OnInit } from '@angular/core';
import { AdminsService } from 'src/app/services/adminsservices/admins.service';
import { Admins } from '../../models/admins';

@Component({
  selector: 'app-listsofadmins',
  templateUrl: './listsofadmins.component.html',
  styleUrls: ['./listsofadmins.component.css']
})
export class ListsofadminsComponent implements OnInit {

  Admins: Admins[];

  constructor(private adminService:AdminsService) { }

  ngOnInit() {
    this.adminService.getAdminList().subscribe(res => {
      this.Admins= res.map( e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as Admins;
      })
    });    
  }

  removeAdmin = admin => this.adminService.deleteAdmin(admin);
}


