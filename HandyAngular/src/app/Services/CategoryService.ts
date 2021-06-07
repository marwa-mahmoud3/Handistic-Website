import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  url_category='https://localhost:44339/api/Category';
  ngOnInit() {          
  } 
  getCategories(){
    return this.http.get(this.url_category)
  }
 }
