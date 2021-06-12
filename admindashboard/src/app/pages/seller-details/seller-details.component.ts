import { Seller } from './../../Models/Seller';
import { RequestServices } from './../../Services/RequestServices';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellertServices } from 'src/app/Services/SellerServices';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.css']
})
export class SellerDetailsComponent implements OnInit {

  currentseller = null;
  constructor(private sellerservices:SellertServices ,private requestservies: RequestServices, private router:Router , private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getSellerDetails(this.route.snapshot.paramMap.get('id'));
  }
  getSellerDetails(id):void{
    this.sellerservices.getSellerByID(id).subscribe(
      seller=>{
        this.currentseller=seller;
      })
  }

  deleteSeller() {
    this.sellerservices.deleteSeller(this.currentseller.sellerId).subscribe()
    this.requestservies.deleteRequestByUserId(this.currentseller.sellerId).subscribe()
    this.router.navigate(['/sellers'])  
  }
  
  blockSeller() {
    this.currentseller.blocksNumber= this.currentseller.blocksNumber+1;
    if(this.currentseller.blocksNumber==3)
    { 
      this.sellerservices.deleteSeller(this.currentseller.sellerId).subscribe()
      this.requestservies.deleteRequestByUserId(this.currentseller.sellerId).subscribe()
      this.router.navigate(['/sellers'])
    }
    else if(this.currentseller.blocksNumber<3)
    {
      this.sellerservices.updateSeller(this.currentseller.id , this.currentseller).subscribe()
    }
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
