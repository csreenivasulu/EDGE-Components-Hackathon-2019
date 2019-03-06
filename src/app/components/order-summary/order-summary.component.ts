import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddtocartService } from '../../services/addtocart.service';
import { Product } from '../../services/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  public totalPrice: number = 0;
  private subscription1: Subscription;
  private deliveryCharge:string = 'Free';
  constructor(private _AddtocartService: AddtocartService) {
  }

  ngOnInit() {
    this.totalPrice = this._AddtocartService.totalPrice;
    this.subscription1 = this._AddtocartService.getUpdatedTotalPrice.subscribe( //get the overall Price
      (data: number) => { this.totalPrice = data }
    );
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }

}
