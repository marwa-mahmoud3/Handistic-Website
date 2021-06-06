import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from '../Shared/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http:HttpClient) { }
baseURL= 'https://localhost:44339/api/Category';


getAllCategories() {
  return this.http.get(this.baseURL);
}

getCategoryById(id): Observable<any> {
  return this.http.get(`${this.baseURL}/${id}`);
  }
  
  createCategory(data): Observable<any> {
  return this.http.post(`${this.baseURL}`, data);
  }
  
  update(id, data): Observable<any> {
  return this.http.put(`${this.baseURL}/${id}`, data);
  }
  
  delete(id): Observable<any> {
  return this.http.delete(`${this.baseURL}/${id}`);
  }
  
 

  }
