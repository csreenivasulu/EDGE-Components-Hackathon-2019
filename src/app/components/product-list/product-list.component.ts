import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetdataService } from '../../services/getdata.service';
import { AddtocartService } from '../../services/addtocart.service';
import { Product } from '../../services/product.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  private _getProductList: Product[] = [];
  private subscription: Subscription;
  private subscription1: Subscription;
  private ProductName: string = 'Creative collections for you';
  public hightlightStatus = [];
  constructor(private _getDataService : GetdataService, private _addCartService : AddtocartService) { 
  }

  ngOnInit() {
    this.subscription = this._getDataService.getProducts().subscribe(
      (data) => {
        this._getProductList = data;
      });
    this._getDataService.funcGetProductList();
    this.subscription1 = this._getDataService.updatedProductList.subscribe(
      (data:Product[]) => {this._getProductList = data}
    );
    console.log(this._getProductList);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  addToCart(item){
    this._addCartService.addToCart(item);
  }

  toggleActive(i){
    console.log(i);
   this.hightlightStatus = [];
    this.hightlightStatus[i]=!this.hightlightStatus[i]
  }

}
