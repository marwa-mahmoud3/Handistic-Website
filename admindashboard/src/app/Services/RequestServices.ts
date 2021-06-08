import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../Models/Request';

@Injectable({
  providedIn: 'root'
})
export class RequestServices {

  constructor(private http: HttpClient) { }
  url_request='https://localhost:44339/api/UserRequests';
  ngOnInit() {          
  }
  addRequest(request : Request)
  {
    return this.http.post(this.url_request,request);
  } 
  getRequestes(){
    return this.http.get(this.url_request)
  }
  deleteRequest(id): Observable<any> {
    return this.http.delete(`${this.url_request}/${id}`);
  }
  updateRequest(id,request): Observable<any> {
    return this.http.put(`${this.url_request}/${id}`,request);
  }
  getRequestByID(id): Observable<any> {
    return this.http.get(`${this.url_request}/${id}`);
  }
}
