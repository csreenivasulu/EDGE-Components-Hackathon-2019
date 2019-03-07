import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription, from, Subject } from 'rxjs';
import { Product } from './product.model';


@Injectable({
  providedIn: 'root'
})
export class GetdataService {
  private _url: string = '/assets/data/product.json';
  private subscription: Subscription;
  public getProductList: any = [];
  public finalRating: number = 0;
  public totalLike: number = 0;
  updatedProductList = new Subject<Product[]>();
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this._url);
  }

  //get overall rating
  getRating(item) {
    let totalRating = 0;
    let noOfReviews = item.review.length;
    
    for(let i = 0; i < item.review.length; i++) {
      totalRating += item.review[i].rating; 
    }
    item.finalRating = Math.floor(totalRating / noOfReviews)
  }
  
  // Post Review
  funcPostReview(id, payload){
    this.getProductList.productItems[id-1].review.unshift(payload);
    this.getRating(this.getProductList.productItems[id-1]);    
    this.updatedProductList.next(this.getProductList);
  }

  // Like the existing review
  funcLikeReview(id, reviewId) {
    this.getProductList.productItems[id-1].review[reviewId].like = this.getProductList.productItems[id-1].review[reviewId].like + 1;
    this.updatedProductList.next(this.getProductList);
  }

  //dislike the existing review
  funcDislikeReview(id, reviewId) {
    this.getProductList.productItems[id-1].review[reviewId].dislike = this.getProductList.productItems[id-1].review[reviewId].dislike + 1;
    this.updatedProductList.next(this.getProductList);
  }


   funcGetProductList() {  //Called @ Product-list
    this.subscription = this.getProducts().subscribe(
      (data) => {
        this.getProductList = data;       
      }
    );
  } 

  /** Get Product item - individual **/
  getProduct<Product>() { 
    return of(this.getProductList.productItems);
  }

}
