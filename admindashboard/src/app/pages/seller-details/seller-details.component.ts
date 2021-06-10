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
  constructor(private sellerservices:SellertServices , private router:Router , private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getSellerDetails(this.route.snapshot.paramMap.get('id'));
  }
  getSellerDetails(id):void{
    this.sellerservices.getSellerByID(id).subscribe(
      seller=>{
        this.currentseller=seller;
        console.log(seller);
      },
      error=>{
           console.log(error);
      });
  }

  deleteSeller(id): void {
    this.sellerservices.deleteSeller(id).subscribe()
  }
  
  blockSeller() {
    this.currentseller.blocksNumber= this.currentseller.blocksNumber+1;
    this.sellerservices.updateSeller(this.currentseller.id , this.currentseller).subscribe()
    this.router.navigate(['/seller'])
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
