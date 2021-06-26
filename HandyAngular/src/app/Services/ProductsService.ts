import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
baseURL= 'https://localhost:44339/api/Product';

getAllProducts() {
  return this.http.get(this.baseURL);
}


getProductById(id): Observable<any> {
return this.http.get(`${this.baseURL}/${id}`);
}

createProduct(data): Observable<any> {
return this.http.post(this.baseURL, data);
}
getOfferdProductsByCategory(id:number):Observable<any>{
  return this.http.get(`${this.baseURL}/GetOfferedProductsByCategory/${id}`);
}
update(id, data): Observable<any> {
return this.http.put(`${this.baseURL}/${id}`, data);
}

deleteById(id): Observable<any> {
return this.http.delete(`${this.baseURL}/${id}`);
}
deleteAll(): Observable<any> {
return this.http.delete(this.baseURL);
}

searchByName(name): Observable<any> {
return this.http.get(`${this.baseURL}/Products?name=${name}`);
}

getCategoryProducts(id): Observable<any>{
  return this.http.get(`${this.baseURL}/ProductList/${id}`);
}
getCountOfProducts(id): Observable<any>{
  return this.http.get(`${this.baseURL}/GetProductsCountByCategoryId/${id}`); 
}
GetProductsByCategoryId(id): Observable<any>{
  return this.http.get(`${this.baseURL}/GetProductsByCategory/${id}`); 
}
getProductsWithDiscount():Observable<any>{
return this.http.get(`${this.baseURL}/GetProductsWithDiscount`);
}
getProductsByCategoryPaging(categoryId:number ,pageSize:number,pageNumber:number):Observable<any>{
  return this.http.get(`https://localhost:44339/api/Product/GetProductsByCategoryByPaging/${categoryId}/${pageSize}/${pageNumber}`);
}
getOfferedByCategoryPaging(categoryId:number ,pageSize:number,pageNumber:number):Observable<any>{
  return this.http.get(`https://localhost:44339/api/Product/GetOfferedByCategoryPagination/${categoryId}/${pageSize}/${pageNumber}`);
}
GetTopSales():Observable<any>{
  return this.http.get(`${this.baseURL}/GetTopSales`);
  }
  getBestSellingPagination(pageSize:number,pageNumber:number):Observable<any>{
    return this.http.get(`https://localhost:44339/api/Product/GetTopSalesPagination/${pageSize}/${pageNumber}`);
  }
  
  getProductsBySearchPagination(keyWord:string ,pageSize:number,pageNumber:number):Observable<any>{
    return this.http.get(`https://localhost:44339/api/Product/SearchByKeyWordPagination/${keyWord}/${pageSize}/${pageNumber}`);
  }
  getCountBySearch(keyWord:string):Observable<any>{
    return this.http.get(`https://localhost:44339/api/Product/CountProductsBySearch/${keyWord}`);
  }
  GetAllProductsBySellerName(sellerName):Observable<any>{
    return this.http.get(`https://localhost:44339/api/Product/GetAllProductsBySellerName/${sellerName}`);
  }
  getSellerProductsPagination(sellerName:string ,pageSize:number,pageNumber:number):Observable<any>{
    return this.http.get(`https://localhost:44339/api/Product/GetSellerProductsPagination/${sellerName}/${pageSize}/${pageNumber}`);
  } 
  getCustomizedProducts(userId:string):Observable<any>{
    let url=`https://localhost:44339/api/Product/GetCustomizedProducts/${userId}`;
    return this.http.get(url);
  }
}