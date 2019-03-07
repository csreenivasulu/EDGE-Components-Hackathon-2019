import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';

import { GetdataService }  from './getdata.service';
import { Product } from './product.model';

@Injectable()
export class ProductResolver implements Resolve<Product[]> {
  constructor(private getDataService: GetdataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    const id = route.paramMap.get('id');
    console.log('randhir '+ id)
    return this.getDataService.getProduct().pipe(take(1),map((item) => {
        console.log(item[Number(id) + 1])
        return item[Number(id)-1]      
      } 
    ))
  }
}