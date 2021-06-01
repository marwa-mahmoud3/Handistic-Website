import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { city } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }
  url_city='https://localhost:44339/api/City';
  ngOnInit() {          
  }
  addCity(city : city)
  {
    return this.http.post(this.url_city,city);
  }

}
