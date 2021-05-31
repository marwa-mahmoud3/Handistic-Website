import { Component, OnInit } from '@angular/core';
import { Admins } from 'src/app/models/admins';
import { firebase } from '@firebase/app';
import { AdminsService } from 'src/app/services/adminsservices/admins.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {  
  Admins: Admins[];
  constructor(private adminService:  AdminsService) { }

  ngOnInit() {
    this.adminService.getAdminList().subscribe(res => {
      const localUser=firebase.auth().currentUser.uid;
      console.log(localUser);
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
