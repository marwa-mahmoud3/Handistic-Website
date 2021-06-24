import { BlackListService } from './../../Services/BlackListService';
import { Component, OnInit } from '@angular/core';
import { Seller } from 'src/app/Models/Seller';
import { Router } from '@angular/router';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.css']
})
export class BlockListComponent implements OnInit {
  constructor(private BlackListService:BlackListService, private router:Router) { }
  sellers:Seller[]=[];
  sellerList:Seller[]=[];
  Currentseller =null;
  ngOnInit(): void {
    this.GetAllsellers();
  }
  GetAllsellers()
  {
    this.BlackListService.getAll().subscribe((data:any)=>{
      this.sellers = data;
      this.sellers.forEach(seller => {
          this.sellerList.push(seller);
      });
    });
  }


}
