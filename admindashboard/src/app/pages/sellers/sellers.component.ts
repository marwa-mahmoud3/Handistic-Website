import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Seller } from 'src/app/Models/Seller';
import { SellertServices } from 'src/app/Services/SellerServices';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {
  constructor(private sellerservice:SellertServices, private router:Router) { }
  sellers:Seller[]=[];
  sellerList:Seller[]=[];
  Currentseller =null;
  ngOnInit(): void {
    this.GetAllsellers();
  }
  GetAllsellers()
  {
    this.sellerservice.getSellers().subscribe((data:any)=>{
      this.sellers = data;
      this.sellers.forEach(seller => {
          this.sellerList.push(seller);
      });
    });
  }


}
