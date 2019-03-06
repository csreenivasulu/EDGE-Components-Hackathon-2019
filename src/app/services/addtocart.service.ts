import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { Subject } from "rxjs";

@Injectable({
	providedIn: 'root'
})

export class AddtocartService {
	cartItemListChanged = new Subject<Product[]>();
	getUpdatedTotalPrice = new Subject();
	private cartItemList: Product[] = [];
	public totalPrice: number = 0;

	getTotalPrice() {
		this.totalPrice = 0;
		for (var i = 0; i < this.cartItemList.length; i++) {
			this.totalPrice += this.cartItemList[i].totalItemPrice;
		}
		this.getUpdatedTotalPrice.next(this.totalPrice)
	}

	getCartItemList4delete(){
		this.getTotalPrice();
		console.log(this.totalPrice);
	}

	getCartItem() {
		return this.cartItemList.slice();
	}

	/**  Add to cart from Product List **/
	addToCart(item: Product) {
		this.cartItemList.push(item);
		this.cartItemListChanged.next(this.cartItemList.slice());
		item.totalItemPrice =  item.qty * item.price; //get the total price of item
		this.getTotalPrice();
		console.log('this.cartItemList');
		console.log(this.cartItemList);
	}

	/** Remove cart Item **/
	removeCartItem(item) {
		let index = this.cartItemList.indexOf(item);
		if (index > -1) {
			this.cartItemList.splice(index, 1);
		}
		this.cartItemListChanged.next(this.cartItemList.slice());
		this.getTotalPrice();
	}

	/**  Increase cart item **/
	increaseCartItem(item) {
		item.qty = item.qty + 1;
		item.totalItemPrice = item.qty * item.price;
		console.log(item);
		this.getTotalPrice();
	}
	/**  Decrease cart item **/
	decreaseCartItem(item) {
		if (item.qty == 1) {
			return false
		} else {
			item.qty = item.qty - 1;
			item.totalItemPrice = item.qty * item.price;
		}
		console.log(item);
		this.getTotalPrice();
	}
}