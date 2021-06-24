import { Seller } from './../../Models/Seller';
import { BlackListService } from './../../Services/BlackListService';
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
  constructor(private sellerservices:SellertServices , private BlackListService : BlackListService,private requestservies: RequestServices, private router:Router , private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getSellerDetails(this.route.snapshot.paramMap.get('id'));
  }
  getSellerDetails(id):void{
    this.sellerservices.getSellerByID(id).subscribe(
      seller=>{
        this.currentseller=seller;
      })
  }
   user:any
  deleteSeller() {
    this.sellerservices.getIdByUserName(this.currentseller.sellerId).subscribe(data=>{
      this.user=data
      this.sellerservices.deleteSeller(this.currentseller.sellerId,this.user.userName).subscribe()
    })    
    this.router.navigate(['/sellers'])  
  }
  blockSeller() {
    this.currentseller.blocksNumber= this.currentseller.blocksNumber+1;
    this.sellerservices.updateSeller(this.currentseller.id , this.currentseller).subscribe()
    if(this.currentseller.blocksNumber==3)
    { 
      this.BlackListService.AddSellerToBlackList(this.currentseller).subscribe()
      this.sellerservices.getIdByUserName(this.currentseller.sellerId).subscribe(data=>{
        this.user=data
        this.sellerservices.deleteSeller(this.currentseller.sellerId,this.user.userName).subscribe()
      })    
      this.router.navigate(['/sellers'])  
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