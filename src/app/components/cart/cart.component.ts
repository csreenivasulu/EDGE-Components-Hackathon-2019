import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddtocartService } from '../../services/addtocart.service';
import { Product } from '../../services/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  private shoppingItem: Product[];
  private subscription: Subscription;
  public totalPrice: number = 0;
  private subscription1: Subscription;
  
  constructor(private _AddtocartService: AddtocartService) {
  }

  ngOnInit() {
    this.shoppingItem = this._AddtocartService.getCartItem();  
    this.subscription = this._AddtocartService.cartItemListChanged.subscribe(
      (data:Product[]) => {this.shoppingItem = data}
    );
    this.subscription1 = this._AddtocartService.getUpdatedTotalPrice.subscribe( //get the overall Price
      (data: number) => { this.totalPrice = data }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  removeCartItem(item){
    this._AddtocartService.removeCartItem(item);
  }

}
