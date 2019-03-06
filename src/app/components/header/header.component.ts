import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddtocartService } from '../../services/addtocart.service';
import { Product } from '../../services/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private cartItemList: Product[];
  private showMiniCart:boolean = false;
  public totalPrice:number=0;
  public totalItemPrice:number=0;
  public getQty:number = 1;
  private subscription: Subscription;
  private subscription1: Subscription;
  constructor(private _AddtocartService: AddtocartService) {
  }
    
  ngOnInit() {
  this.cartItemList = this._AddtocartService.getCartItem();  
  this.subscription = this._AddtocartService.cartItemListChanged.subscribe(
    (data:Product[]) => {this.cartItemList = data}
    );
  this.subscription1 = this._AddtocartService.getUpdatedTotalPrice.subscribe( //get the overall Price
    (data:number) => {this.totalPrice = data}
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }

  toggleMiniCart(){
    this.showMiniCart = !this.showMiniCart;
  }

 removeCartItem(item){
    this._AddtocartService.removeCartItem(item);
    this.updatePrice(item);
  }

  hideMiniCart() {
    this.showMiniCart = false;
  }

  updatePrice(cartItem){ // to show individual item price
    cartItem.totalItemPrice = cartItem.price * cartItem.qty;
  }

  
}
