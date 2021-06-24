import { Router } from '@angular/router';
import { sellerService } from './../Services/sellerService';
import { Users } from './../Models/Users';
import { UserService } from 'src/app/Services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  UserList: Users[] = []
  filterTerm: string;
  constructor(private UserService: UserService, private sellerService: sellerService, private router: Router) { }
  ngOnInit(): void {
    this.UserService.getAllUsers().subscribe((data: any) => {
      data.forEach(element => {
        this.UserList.push(element)
      });
    })
  }

  user ;
  answer;
  goToProfile(i) {
    this.UserService.getIdByUserName(this.UserList[i].userName).subscribe(
      data => {
        this.user = data;
        this.sellerService.CheckSellerORNot(this.user.id).subscribe(
          e => {
            this.answer = e;
            if (this.answer) {
              this.router.navigate([`/SellerProfile/${this.user.userName}`]);
            }
            else {
              this.router.navigate([`/UserProfile/${this.user.userName}`]);
            }
          })
      });
  }

}
