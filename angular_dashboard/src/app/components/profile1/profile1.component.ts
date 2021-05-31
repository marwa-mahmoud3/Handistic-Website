import {
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/authservices/auth.service';
import { AdminsService } from 'src/app/services/adminsservices/admins.service';

@Component({
  selector: 'app-profile1',
  templateUrl: './profile1.component.html',
  styleUrls: ['./profile1.component.css'],
})
export class Profile1Component implements OnInit, AfterViewInit {
  adminRef?: any;
  public iddoc;
  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    public adminService:  AdminsService,
    private auth: AuthService,
  ) {}
 
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.adminRef = JSON.parse(localStorage.getItem('user'));
    //console.log(this.adminRef);
    this.iddoc= JSON.parse(localStorage.getItem('doc'));
    //console.log(this.iddoc+"==========");
  }
}
