import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  url_category='https://localhost:44339/api/Category';
  ngOnInit() {          
  } 
  addCategory(category : Category)
  {
    return this.http.post(this.url_category,category);
  } 
  getCategories(){
    return this.http.get(this.url_category)
  }
  deleteCategory(id): Observable<any> {
    return this.http.delete(`${this.url_category}/${id}`);
  }
  updateCategory(id,category): Observable<any> {
    return this.http.put(`${this.url_category}/${id}`,category);
  }
  getCategoryByID(id): Observable<any> {
    return this.http.get(`${this.url_category}/${id}`);
  }
 }
