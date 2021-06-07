import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http:HttpClient) { }
baseURL= 'https://localhost:44339/api/Category';


getCategories() {
  return this.http.get(this.baseURL);
}
}
