import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }
  url_city='https://localhost:44339/api/City';
  ngOnInit() {          
  }
  getCities(){
    return this.http.get(this.url_city)
  }
}
