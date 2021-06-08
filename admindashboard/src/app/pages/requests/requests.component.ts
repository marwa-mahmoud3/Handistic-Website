import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestServices } from 'src/app/Services/RequestServices';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(private requestservices:RequestServices , private router:Router) { }
  requests:Request[]=[];
  RequestList:Request[]=[];
  CurrentRequest =null;
  ngOnInit(): void {
    this.GetAllRequests();

  }
  GetAllRequests()
  {
    this.requestservices.getRequestes().subscribe((data:any)=>{
      this.requests = data;
      this.requests.forEach(request => {
          this.RequestList.push(request);
      });
    });
  }

}


