import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  getCities(){
    return this.http.get(this.url_city)
  }
  deleteCity(id): Observable<any> {
    return this.http.delete(`${this.url_city}/${id}`);
  }
  updateCity(id,city): Observable<any> {
    return this.http.put(`${this.url_city}/${id}`,city);
  }
  getCityByID(id): Observable<any> {
    return this.http.get(`${this.url_city}/${id}`);
  }
}
