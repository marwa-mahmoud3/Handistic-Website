import { ActivatedRoute, Router } from '@angular/router';
import { BlackListService } from './../../Services/BlackListService';
import { SellertServices } from './../../Services/SellerServices';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-list-details',
  templateUrl: './block-list-details.component.html',
  styleUrls: ['./block-list-details.component.css']
})
export class BlockListDetailsComponent implements OnInit {

  filterTerm: string;
  item :number;

  currentseller = null;
  constructor(private sellerservices:SellertServices ,private router :Router,
     private BlackListService : BlackListService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getSellerDetails(this.route.snapshot.paramMap.get('id'));
  }
  getSellerDetails(id):void{
    this.BlackListService.getById(id).subscribe(
      seller=>{
        this.currentseller=seller;
      })
  }
   user:any
  UNblockSeller() {
      this.BlackListService.unBlock(this.currentseller.id).subscribe()
      this.router.navigate(['/sellers']) 
  }
  
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44339/${serverPath}`;
  }
  public response: {dbPath: ''};
  onCreate()
  {
    this.currentseller = {
      idCardImage: this.response.dbPath,
      personWithCardImage : this.response.dbPath,
      productWithCardImage :this.response.dbPath,
    }
  }
  public uploadFinished = (event) => {
    this.response = event;
  }
}
