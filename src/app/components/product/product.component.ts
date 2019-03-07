import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../services/product.model';
import { GetdataService } from '../../services/getdata.service';
import { AddtocartService } from '../../services/addtocart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id: string;
  name: string;
  product: Product[];
  constructor(private route: ActivatedRoute, private _getDataService : GetdataService, private _addCartService : AddtocartService) { }

  ngOnInit() {
   this.product = this.route.snapshot.data.product;
  }

  addToCart(item){
    this._addCartService.addToCart(item);
  }
}
