import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestModel } from '../Models/RequestModel';


@Injectable({
  providedIn: 'root'
})
export class userRequest {

  constructor(private http: HttpClient) { }
  url='https://localhost:44339/api/UserRequests';
  ngOnInit() {          
  }
  inserRequest(request : RequestModel )
  {
    return this.http.post(this.url,request);
  }
}