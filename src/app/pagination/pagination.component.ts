import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { PagerService } from '../_services/index'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  submitted = false;
  loading:boolean;
  constructor(private http: Http, private pagerService: PagerService) { }

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  key: string = 'name'; //set default
reverse: boolean = false;
sort(key){
  this.key = key;
  this.reverse = !this.reverse;
}

  ngOnInit() {
      // get dummy data
      this.http.get('assets/dummy-data.json').pipe(
          map((response: Response) => response.json()))
          .subscribe(data => {
              // set items to json response
              this.allItems = data;

              // initialize to page 1
              this.setPage(1);
          });

            
  }

  
    

  setPage(page: number) {
      // get pager object from service
      this.pager = this.pagerService.getPager(this.allItems.length, page);

      // get current page of items
      this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
