import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestServices } from 'src/app/Services/RequestServices';
import { SellertServices } from 'src/app/Services/SellerServices';

@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['./requestdetails.component.css']
})
export class RequestdetailsComponent implements OnInit {

  currentrequest = null;
  newseller=null;
  constructor(private requestservice:RequestServices,private sellerservices:SellertServices , private router:Router , private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getRequestDetails(this.route.snapshot.paramMap.get('id'));
  }
  getRequestDetails(id):void{
    this.requestservice.getRequestByID(id).subscribe(
      request=>{
        this.currentrequest=request;
        console.log(request);
      },
      error=>{
           console.log(error);
      });
  }

  updateAcceptRequest() {
    localStorage.setItem('seller','true')
    this.currentrequest.isAccepted=true;
    this.requestservice.updateRequest(this.currentrequest.id , this.currentrequest).subscribe()
    this.newseller.FirstName=this.currentrequest.firstName;
    this.newseller.LastName=this.currentrequest.lastName;
    this.newseller.Phone=this.currentrequest.phone;
    this.newseller.Governorate=this.currentrequest.governorate;
    this.newseller.IdCardImage=this.currentrequest.idCardImage;
    this.newseller.PersonWithCardImage=this.currentrequest.personWithCardImage;
    this.newseller.Link=this.currentrequest.link;
    this.newseller.ProductWithCardImage=this.currentrequest.productWithCardImage;

    this.sellerservices.addseller(this.newseller).subscribe()
    this.requestservice.deleteRequest(this.currentrequest.id).subscribe()

    this.router.navigate(['/request'])
  }
  deleteRequest() {
    this.requestservice.deleteRequest(this.currentrequest.id).subscribe()
    this.router.navigate(['/request'])
  }

  
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44339/${serverPath}`;
  }
  public response: {dbPath: ''};
  onCreate()
  {
    this.currentrequest = {
      idCardImage: this.response.dbPath,
      personWithCardImage : this.response.dbPath,
      productWithCardImage :this.response.dbPath,
    }
  }
  public uploadFinished = (event) => {
    this.response = event;
  }
}
