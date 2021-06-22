import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SellerReview } from '../Models/SellerReview';

@Injectable({
  providedIn: 'root'
})
export class SellerReviewService {

  constructor(private http: HttpClient) { }
  url_review='https://localhost:44339/api/SellerReviews/AddSellerReview';
  ngOnInit() {          
  }
 
  AddReview(review : SellerReview)
  {
    return this.http.post(this.url_review,review);
  }
  CountReviews(sellerId)
  {
    let url =`https://localhost:44339/api/SellerReviews/SellerReviewsCount/${sellerId}`
    return this.http.get(url)
  }
  averagerRating(sellerId)
  {
    let url =`https://localhost:44339/api/SellerReviews/averageRate/${sellerId}`
    return this.http.get(url)
  }
  ShowReviews(sellerId)
  {
      let url=`https://localhost:44339/api/SellerReviews/${sellerId}`;
      return this.http.get(url)
  }
}
