import { Injectable } from '@angular/core';
import { WriteReviewModel } from './write-review.model';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class WriteReviewService {
	url: string;
  constructor(private http: HttpClient) { }
  
  postReviewData(data){
    const url = '/assets/data/product.json';
    const httpOptions = {
		  headers: new HttpHeaders({
		    'Content-type': 'application/json',
		    'Authorization': ''
		  })
	};
    return this.http.post<WriteReviewModel[]>(url, data, httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  }
}
