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
  updatedProductList = new Subject<Product[]>();
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this._url);
  }

  /* getList() {
    this.getProducts().subscribe(
      (data) => {
        this.getProductList = data;
      }
    );

    for(let i=0; i < this.getProductList.length; i++) {
      console.log('item');
    }
  } */

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
 /*  getProduct<Product>(id) { 
    console.log(this.getProductList)
    return of(this.getProductList.find(item => item.id === id));
  } */
  
  
}
